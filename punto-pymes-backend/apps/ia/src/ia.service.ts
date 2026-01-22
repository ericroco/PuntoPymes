import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

import { GoogleGenerativeAI } from '@google/generative-ai';
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';
import { TaskType } from '@google/generative-ai';
import { DocumentoEmbedding } from 'default/database';

@Injectable()
export class IaService {
  private readonly logger = new Logger(IaService.name);
  private genAI: GoogleGenerativeAI;
  private embeddingsModel: GoogleGenerativeAIEmbeddings;

  constructor(
    private configService: ConfigService,
    @InjectRepository(DocumentoEmbedding)
    private readonly embeddingRepo: Repository<DocumentoEmbedding>,
  ) {
    const apiKey = this.configService.getOrThrow<string>('GEMINI_API_KEY');

    this.genAI = new GoogleGenerativeAI(apiKey);

    this.embeddingsModel = new GoogleGenerativeAIEmbeddings({
      modelName: 'text-embedding-004',
      apiKey: apiKey,
      taskType: TaskType.RETRIEVAL_DOCUMENT,
    });
  }

  private async retryOperation<T>(operation: () => Promise<T>, retries = 3, delay = 5000): Promise<T> {
    for (let i = 0; i < retries; i++) {
      try {
        return await operation();
      } catch (error) {
        if (error.message?.includes('429') || error.status === 429 || error.status === 503) {
          this.logger.warn(`⏳ Cuota Gemini excedida. Esperando ${delay / 1000}s para reintentar (Intento ${i + 1}/${retries})...`);
          await new Promise(res => setTimeout(res, delay));
          delay *= 2;
        } else {
          throw error;
        }
      }
    }
    throw new Error('Operación fallida tras varios intentos por saturación de API.');
  }

  async procesarDocumento(filePath: string, documentoId: string) {
    this.logger.log(`🤖 IA: Iniciando procesamiento para DocID: ${documentoId}`);

    try {
      const absolutePath = path.resolve(filePath);

      if (!fs.existsSync(absolutePath)) {
        throw new Error(`El archivo no existe en: ${absolutePath}`);
      }

      const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');

      const dataBuffer = fs.readFileSync(absolutePath);
      const typedArray = new Uint8Array(dataBuffer);

      const loadingTask = pdfjsLib.getDocument({ data: typedArray });
      const pdfDocument = await loadingTask.promise;

      let textoCompleto = '';

      // Extraer texto de todas las páginas
      for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
        const page = await pdfDocument.getPage(pageNum);
        const textContent = await page.getTextContent();
        const pageText = textContent.items.map((item: any) => item.str).join(' ');
        textoCompleto += pageText + '\n';
      }

      if (!textoCompleto || textoCompleto.trim().length === 0) {
        this.logger.warn('⚠️ El PDF parece estar vacío o es una imagen escaneada.');
        return;
      }

      this.logger.log(`📄 Texto extraído: ${textoCompleto.length} caracteres`);

      await this.embeddingRepo.delete({ documentoId });

      // 🔧 MEJORA 1: Chunks más grandes para mejor contexto
      const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1500,  // ⬆️ Aumentado de 1000 a 1500
        chunkOverlap: 300, // ⬆️ Aumentado de 200 a 300 para mejor continuidad
      });
      const docs = await splitter.createDocuments([textoCompleto]);

      const batchSize = 5;
      for (let i = 0; i < docs.length; i += batchSize) {
        const batch = docs.slice(i, i + batchSize);
        const batchTexts = batch.map((d) => d.pageContent);

        const vectors = await this.retryOperation(() =>
          this.embeddingsModel.embedDocuments(batchTexts)
        );

        const entidades = batch.map((doc, index) => {
          return this.embeddingRepo.create({
            contenido: doc.pageContent,
            vector: JSON.stringify(vectors[index]) as any,
            documentoId: documentoId,
          });
        });

        await this.embeddingRepo.save(entidades);
        await new Promise(r => setTimeout(r, 1000));
      }
      this.logger.log(`✅ Documento procesado y memorizado EXITOSAMENTE.`);

    } catch (error) {
      this.logger.error(`❌ Error procesando documento: ${error.message}`, error.stack);
    }
  }

  async consultarIA(pregunta: string) {
    this.logger.log(`💬 Pregunta recibida: ${pregunta}`);
    const inicio = Date.now();

    try {
      const vectorPregunta = await this.retryOperation(() =>
        this.embeddingsModel.embedQuery(pregunta)
      );

      const vectorString = JSON.stringify(vectorPregunta);

      // 🔧 MEJORA 2: Más resultados y umbral más bajo
      const resultados: any[] = await this.embeddingRepo.query(
        `SELECT contenido, 1 - (vector <=> $1) as similitud 
         FROM documentos_embeddings 
         ORDER BY vector <=> $1 ASC 
         LIMIT 10`,  // ⬆️ Aumentado de 6 a 10
        [vectorString]
      );

      // 🔧 MEJORA 3: Umbral más bajo para capturar más información relevante
      const fragmentosUtiles = resultados.filter(r => r.similitud > 0.15); // ⬇️ Reducido de 0.25 a 0.15

      // 📊 LOG DE SIMILITUDES
      this.logger.log(`📊 Fragmentos encontrados: ${fragmentosUtiles.length} (de ${resultados.length} analizados)`);
      resultados.forEach((r, idx) => {
        const preview = r.contenido.substring(0, 100).replace(/\n/g, ' ');
        this.logger.log(`  [${idx + 1}] Similitud: ${(r.similitud * 100).toFixed(2)}% - "${preview}..."`);
      });

      if (fragmentosUtiles.length === 0) {
        return { respuesta: "No encontré información en las políticas de la empresa sobre ese tema." };
      }

      const contexto = fragmentosUtiles.map(r => r.contenido).join('\n\n---\n\n');

      // 🔧 MEJORA 4: Más tokens y temperatura ajustada
      const generationConfig = {
        temperature: 0.2,  // ⬇️ Más determinista
        maxOutputTokens: 2048,  // ⬆️ Aumentado de 800 a 2048 para respuestas completas
        topP: 0.95,
        topK: 40,
      };

      const model = this.genAI.getGenerativeModel({
        model: 'gemini-flash-latest',
        generationConfig
      });

      // 🔧 MEJORA 5: Prompt mejorado sin markdown
      const prompt = `
Eres un asistente experto en RRHH de la empresa PuntoPyMES.
Responde a la pregunta basándote EXCLUSIVAMENTE en el siguiente CONTEXTO.

CONTEXTO:
${contexto}

PREGUNTA:
${pregunta}

INSTRUCCIONES IMPORTANTES:
1. Si la respuesta está en el contexto, explícala de forma clara y completa
2. Si no está, di que no tienes información
3. NO uses formato markdown (sin *, **, #, ###, ni listas con guiones)
4. Escribe en texto plano con párrafos normales
5. Usa saltos de línea simples para separar ideas
6. Numera pasos como "1.", "2.", etc. si es necesario
7. COMPLETA toda la respuesta, nunca la dejes a medias
8. Sé conversacional y amable

Responde ahora en texto plano:
      `;

      const result = await this.retryOperation(() =>
        model.generateContent(prompt)
      );

      const respuesta = result.response.text();

      // 🔧 MEJORA 6: Verificar si la respuesta está truncada
      if (respuesta.length < 50 || respuesta.endsWith('...') || !this.esRespuestaCompleta(respuesta)) {
        this.logger.warn(`⚠️ Respuesta posiblemente truncada. Longitud: ${respuesta.length}`);
      }

      this.logger.log(`🚀 Respuesta generada en ${Date.now() - inicio}ms (${respuesta.length} caracteres)`);
      return { respuesta };

    } catch (error) {
      this.logger.error(`❌ Error en consultarIA: ${error.message}`);
      return { respuesta: "El sistema está experimentando alta demanda. Intenta luego." };
    }
  }

  // 🔧 MEJORA 7: Función auxiliar para detectar respuestas incompletas
  private esRespuestaCompleta(texto: string): boolean {
    const ultimoCaracter = texto.trim().slice(-1);
    const caracteresFinales = ['.', '!', '?', ':', '"'];
    const palabrasIncompletas = ['La', 'El', 'Los', 'Las', 'Un', 'Una', 'De', 'En'];

    const ultimaPalabra = texto.trim().split(' ').pop() || '';

    // Verificar si termina con signo de puntuación apropiado
    if (!caracteresFinales.includes(ultimoCaracter)) {
      return false;
    }

    // Verificar si la última palabra parece incompleta
    if (palabrasIncompletas.includes(ultimaPalabra)) {
      return false;
    }

    return true;
  }
}