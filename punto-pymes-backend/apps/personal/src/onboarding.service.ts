import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
    TareaPlantilla,
    PlantillaOnboarding,
    TareaEmpleado
} from 'default/database';
@Injectable()
export class OnboardingService {
    constructor(
        @InjectRepository(PlantillaOnboarding) private readonly plantillaRepo: Repository<PlantillaOnboarding>,
        @InjectRepository(TareaEmpleado) private readonly tareaEmpleadoRepo: Repository<TareaEmpleado>,
    ) { }

    /**
       * 1. CREAR PLANTILLA (Para RRHH)
       * Guarda la "receta" maestra (Ej: "Inducción General")
       */
    async createPlantilla(empresaId: string, data: any) {
        // data debe coincidir con tu DTO (nombre, descripcion, tareas[])
        const nuevaPlantilla = this.plantillaRepo.create({
            ...data,
            empresaId, // Asignamos la empresa para multitenancy
        });
        return this.plantillaRepo.save(nuevaPlantilla);
    }

    /**
     * 2. ASIGNAR PLANTILLA A UN EMPLEADO
     * Copia las tareas de la plantilla a la lista personal del empleado
     */
    async asignarPlantilla(empleadoId: string, plantillaId: string) {
        // a) Buscamos la plantilla maestra y sus tareas
        const plantilla = await this.plantillaRepo.findOne({
            where: { id: plantillaId },
            relations: ['tareas'],
        });

        if (!plantilla) {
            throw new NotFoundException('La plantilla de onboarding no existe.');
        }

        // b) Creamos las copias personales para este empleado específico
        const tareasPersonales = plantilla.tareas.map((t) => {
            return this.tareaEmpleadoRepo.create({
                empleadoId: empleadoId,
                titulo: t.titulo,
                descripcion: t.descripcion,
                enlace: t.enlace,
                completado: false, // Siempre empieza incompleta
                plantillaOrigenId: plantilla.id,
            });
        });

        // c) Guardamos las tareas del empleado
        return this.tareaEmpleadoRepo.save(tareasPersonales);
    }

    /**
     * 3. VER PROGRESO (Para el Dashboard del Frontend)
     * Devuelve las tareas formateadas como las necesita tu componente Angular
     */
    async getMisTareas(empleadoId: string) {
        const tareas = await this.tareaEmpleadoRepo.find({
            where: { empleadoId },
            order: { createdAt: 'ASC' }, // Ordenar por creación o podrías agregar un campo 'orden'
        });

        // Mapeamos al formato exacto de tu interfaz OnboardingTask del Frontend
        return tareas.map((t) => ({
            id: t.id,
            title: t.titulo,
            description: t.descripcion,
            link: t.enlace,
            isComplete: t.completado,
        }));
    }

    /**
     * 4. MARCAR CHECKBOX
     * Actualiza el estado de una tarea
     */
    async toggleTarea(tareaId: string, isComplete: boolean) {
        // Update simple: busca por ID y actualiza el campo 'completado'
        await this.tareaEmpleadoRepo.update(tareaId, { completado: isComplete });
        return { success: true };
    }

    async seedOnboarding(empresaId: string, empleadoId: string) {

        // 1. Buscamos si ya existe
        const plantillaExistente = await this.plantillaRepo.findOne({
            where: { empresaId, nombre: 'Onboarding General' },
            relations: ['tareas']
        });

        if (plantillaExistente) {
            console.log('ℹ️ La plantilla ya existía, asignando...');
            return this.asignarPlantilla(empleadoId, plantillaExistente.id);
        }

        // 2. Creamos la NUEVA
        const nuevaPlantilla = this.plantillaRepo.create({
            nombre: 'Onboarding General',
            descripcion: 'Pasos básicos para todo nuevo ingreso en Punto Pymes.',
            empresaId: empresaId,
            tareas: [
                {
                    titulo: 'Completa tu Perfil',
                    descripcion: 'Sube tu foto y actualiza tu teléfono de contacto.',
                    diaRelativo: 0,
                    enlace: '/dashboard/my-profile'
                },
                {
                    titulo: 'Video de Bienvenida',
                    descripcion: 'Mira el mensaje de nuestro CEO sobre la cultura de la empresa.',
                    diaRelativo: 0,
                    enlace: null
                },
                {
                    titulo: 'Políticas de Seguridad',
                    descripcion: 'Lee y acepta el manual de seguridad de la información.',
                    diaRelativo: 1,
                    enlace: '/dashboard/policies'
                },
                {
                    titulo: 'Configuración de Correo',
                    descripcion: 'Asegúrate de tener acceso a tu email corporativo.',
                    diaRelativo: 1,
                    enlace: null
                }
            ]
        } as any);

        // 3. GUARDAMOS (👇 AQUÍ ESTÁ EL ARREGLO)
        // Le decimos a TypeScript: "Oye, confía en mí, esto devuelve UNA SOLA Plantilla"
        const plantillaGuardada = (await this.plantillaRepo.save(nuevaPlantilla)) as unknown as PlantillaOnboarding;
        console.log('✅ Plantilla General creada automáticamente.');

        // 4. Ahora sí, .id funcionará
        return this.asignarPlantilla(empleadoId, plantillaGuardada.id);
    }
}