import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DocumentsService, DocumentoEmpresa } from '../../../../core/services/documents';
import { UploadDocumentDialogComponent } from '../../components/upload-document-dialog/upload-document-dialog';
import { ContextService } from '../../../../modules/dashboard/services/context';
import { AddDocumentDialog } from '../../../dashboard/components/add-document-dialog/add-document-dialog'; // Ajusta ruta

@Component({
  selector: 'app-documents-page',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatButtonModule, MatIconModule,
    MatChipsModule, MatDialogModule, MatTooltipModule
  ],
  templateUrl: './documents-page.html',
  styleUrl: './documents-page.scss'
})
export class DocumentsPageComponent implements OnInit {
  private docsService = inject(DocumentsService);
  private dialog = inject(MatDialog);
  public contextService = inject(ContextService); // Para suscribirse a cambios

  displayedColumns: string[] = ['icon', 'nombre', 'categoria', 'scope', 'fecha', 'actions'];
  dataSource: DocumentoEmpresa[] = [];
  readonly POLICY_CATEGORIES = ['POLÍTICA', 'REGLAMENTO', 'NORMATIVA', 'CÓDIGO DE ÉTICA', 'LEGAL'];

  ngOnInit() {
    this.loadDocuments();

    // ESCUCHAR CAMBIOS DE SEDE: Si el usuario cambia el dropdown, recargamos la tabla
    this.contextService.branch$.subscribe(() => {
      this.loadDocuments();
    });
  }

  loadDocuments() {
    this.docsService.getDocuments().subscribe(allDocs => {

      // 👇 FILTRO INVERSO:
      // "Dame los documentos donde su categoría NO ESTÉ INCLUIDA en la lista de políticas"
      this.dataSource = allDocs.filter(doc =>
        !this.POLICY_CATEGORIES.includes(doc.categoria)
      );

    });
  }


  deleteDocument(doc: DocumentoEmpresa) {
    if (confirm(`¿Seguro deseas eliminar "${doc.nombre}"?`)) {
      this.docsService.deleteDocument(doc.id).subscribe(() => this.loadDocuments());
    }
  }

  download(url: string) {
    window.open(url, '_blank');
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(AddDocumentDialog, {
      width: '500px',
      data: {
        mode: 'company', // 👈 LE DECIMOS QUE ACTÚE COMO CORPORATIVO
        title: 'Subir Documento Corporativo'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.processUpload(result);
      }
    });
  }

  // PROCESAR LA SUBIDA (Lógica de 2 pasos)
  processUpload(data: any) {
    // data contiene: { fileName, documentType, sucursalId, file }

    // 1. Subir Físico
    this.docsService.uploadFile(data.file).subscribe({
      next: (url) => {

        // 2. Crear Metadata
        const dto = {
          nombre: data.fileName,     // Mapeamos fileName -> nombre
          categoria: data.documentType, // Mapeamos documentType -> categoria
          url: url,
          sucursalId: data.sucursalId, // Lo que eligió en el select
          descripcion: '' // Opcional
        };

        this.docsService.createDocument(dto).subscribe(() => {
          this.loadDocuments(); // Recargar tabla
        });
      },
      error: (err) => console.error('Error subiendo', err)
    });
  }
}