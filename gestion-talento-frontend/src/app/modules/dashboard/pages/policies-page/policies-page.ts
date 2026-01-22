import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSpinner } from '@angular/material/progress-spinner';

// Servicios y Componentes
import { DocumentsService, DocumentoEmpresa } from '../../../../core/services/documents';
import { AddDocumentDialog } from '../../components/add-document-dialog/add-document-dialog';
import { AuthService } from '../../../../modules/auth/services/auth';
import { PERMISSIONS } from '../../../../shared/constants/permissions';

@Component({
  selector: 'app-policies-page',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatTooltipModule, MatSpinner],
  templateUrl: './policies-page.html',
  styleUrls: ['./policies-page.scss'],
})
export class PoliciesPageComponent implements OnInit {
  private docsService = inject(DocumentsService);
  private dialog = inject(MatDialog);
  public authService = inject(AuthService);

  displayedColumns: string[] = ['icon', 'nombre', 'categoria', 'fecha', 'actions'];
  dataSource: DocumentoEmpresa[] = [];

  // Permiso: Solo RRHH o Admin puede subir/borrar políticas
  canManagePolicies = this.authService.hasPermission(PERMISSIONS.COMPANY_POLICIES_MANAGE);

  ngOnInit() {
    this.loadPolicies();
  }

  loadPolicies() {
    this.docsService.getDocuments().subscribe(allDocs => {
      // FILTRO: Solo mostramos documentos que sean Políticas/Reglamentos
      const policyCategories = ['POLÍTICA', 'REGLAMENTO', 'NORMATIVA', 'CÓDIGO DE ÉTICA'];

      this.dataSource = allDocs.filter(doc =>
        policyCategories.includes(doc.categoria)
      );
    });
  }

  openUploadDialog() {
    const dialogRef = this.dialog.open(AddDocumentDialog, {
      width: '500px',
      data: {
        mode: 'policy', // 👈 AQUÍ LA MAGIA: Activa el modo política
        title: 'Nueva Política / Normativa'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.processUpload(result);
      }
    });
  }

  processUpload(data: any) {
    // 1. Subir archivo físico
    this.docsService.uploadFile(data.file).subscribe({
      next: (url) => {
        // 2. Crear Metadata
        const dto = {
          nombre: data.fileName,
          categoria: data.documentType,
          url: url,
          sucursalId: null, // Políticas siempre son Globales
          descripcion: 'Documento de Normativa Interna'
        };
        this.docsService.createDocument(dto).subscribe(() => this.loadPolicies());
      },
      error: (err) => console.error(err)
    });
  }

  download(url: string) { window.open(url, '_blank'); }

  deleteDoc(id: string) {
    if (confirm('¿Seguro deseas eliminar este documento normativo?')) {
      this.docsService.deleteDocument(id).subscribe(() => this.loadPolicies());
    }
  }

  isPdf(filename: string): boolean {
    return filename?.toLowerCase().endsWith('.pdf');
  }
}