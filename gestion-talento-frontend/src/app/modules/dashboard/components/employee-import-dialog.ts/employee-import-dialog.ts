import { Component, inject, NgZone, ChangeDetectorRef } from '@angular/core'; // <--- AGREGAR ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { EmployeesService } from '../../services/employees';
import { BulkImportResponse } from '../../models/bulk-import.models';

interface SystemField {
  key: string;
  label: string;
  required: boolean;
  type: 'string' | 'number' | 'date';
}

@Component({
  selector: 'app-employee-import-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatStepperModule, MatSelectModule, MatIconModule, MatProgressBarModule
  ],
  templateUrl: './employee-import-dialog.html',
  styleUrls: ['./employee-import-dialog.scss']
})
export class EmployeeImportDialog {
  private employeeService = inject(EmployeesService);
  private snackBar = inject(MatSnackBar);
  public dialogRef = inject(MatDialogRef<EmployeeImportDialog>);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef); // <--- INYECTAR ESTO

  systemFields: SystemField[] = [
    { key: 'nombre', label: 'Nombres', required: true, type: 'string' },
    { key: 'apellido', label: 'Apellidos', required: true, type: 'string' },
    { key: 'nroIdentificacion', label: 'Nro. Identificación (Cédula)', required: true, type: 'string' },
    { key: 'emailPersonal', label: 'Email Personal', required: true, type: 'string' },
    { key: 'salario', label: 'Salario Base', required: false, type: 'number' },
    { key: 'fechaInicio', label: 'Fecha Inicio', required: false, type: 'date' },
    { key: 'cargoNombre', label: 'Nombre del Cargo', required: false, type: 'string' },
  ];

  rawJsonData: any[] = [];
  sourceKeys: string[] = [];
  fieldMapping: { [key: string]: string } = {};

  isProcessing = false;
  importResult: BulkImportResponse | null = null;

  // --- PASO 1: LEER ARCHIVO (LÓGICA BLINDADA) ---
  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      // Forzar ejecución dentro de la zona de Angular
      this.ngZone.run(() => {
        try {
          const json = JSON.parse(e.target.result);
          
          if (Array.isArray(json) && json.length > 0) {
            console.log('JSON Cargado:', json.length, 'registros');
            
            // 1. Asignar datos (creando nueva referencia para disparar cambios)
            this.rawJsonData = [...json];
            this.sourceKeys = Object.keys(json[0]);
            
            // 2. Automapeo
            this.autoMapFields();

            // 3. FORZAR DETECCIÓN DE CAMBIOS MANUALMENTE
            this.cdr.markForCheck(); 
            this.cdr.detectChanges(); // Doble seguridad
            
          } else {
            this.snackBar.open('El archivo JSON está vacío o no es una lista válida', 'Cerrar');
            this.rawJsonData = [];
          }
        } catch (err) {
          console.error(err);
          this.snackBar.open('Error: El archivo no es un JSON válido', 'Cerrar');
          this.rawJsonData = [];
        }

        // 4. RESETEAR EL INPUT PARA PERMITIR SUBIR EL MISMO ARCHIVO DE NUEVO
        input.value = ''; 
      });
    };

    reader.onerror = () => {
      this.ngZone.run(() => {
        this.snackBar.open('Error de lectura del archivo', 'Cerrar');
        input.value = '';
      });
    };

    reader.readAsText(file);
  }

  autoMapFields() {
    this.systemFields.forEach(field => {
      const match = this.sourceKeys.find(k => 
        k.toLowerCase() === field.key.toLowerCase() || 
        k.toLowerCase().includes(field.label.toLowerCase())
      );
      if (match) this.fieldMapping[field.key] = match;
    });
  }

  processImport() {
    this.isProcessing = true;
    
    // Mapeo seguro
    const cleanEmployees = this.rawJsonData.map(row => {
      const newEmp: any = {};
      this.systemFields.forEach(field => {
        const sourceKey = this.fieldMapping[field.key];
        if (sourceKey) {
          newEmp[field.key] = this.cleanValue(row[sourceKey], field.type);
        }
      });
      newEmp.estado = 'ACTIVO';
      newEmp.tipoIdentificacion = 'CEDULA';
      return newEmp;
    });

    const hasMissingData = cleanEmployees.some(e =>
      !e.nombre || !e.apellido || !e.nroIdentificacion || !e.emailPersonal
    );

    if (hasMissingData) {
      this.snackBar.open('Error: Faltan campos obligatorios. Revisa el paso "Conectar".', 'Cerrar', { duration: 5000 });
      this.isProcessing = false;
      return;
    }

    this.employeeService.importBulk(cleanEmployees).subscribe({
      next: (res) => {
        this.importResult = res;
        this.isProcessing = false;
        this.cdr.detectChanges(); // Actualizar vista final
        if (res.errors === 0) {
          this.snackBar.open('¡Importación exitosa!', 'Cerrar', { duration: 3000 });
        }
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error del servidor', 'Cerrar');
        this.isProcessing = false;
        this.cdr.detectChanges();
      }
    });
  }

  cleanValue(val: any, type: string): any {
    if (val === null || val === undefined || val === '') return null;
    if (type === 'string') return String(val).trim();
    if (type === 'number') {
      if (typeof val === 'string') return parseFloat(val.replace(/[^0-9.-]+/g, '')) || 0;
      return Number(val);
    }
    if (type === 'date') {
      // Manejo simple de fechas para evitar errores
      const date = new Date(val);
      return isNaN(date.getTime()) ? null : date.toISOString().split('T')[0];
    }
    return val;
  }
}