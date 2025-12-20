import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
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
  key: string;       // Debe coincidir con tu CreateEmpleadoDto del backend
  label: string;     // Lo que ve el usuario
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

  // 1. CONFIGURACIÓN: Campos exactos de tu CreateEmpleadoDto
  systemFields: SystemField[] = [
    // 1. NOMBRES (Tu interfaz dice 'nombre', no 'nombres')
    { key: 'nombre', label: 'Nombres', required: true, type: 'string' },

    // 2. APELLIDOS (Tu interfaz dice 'apellido', no 'apellidos')
    { key: 'apellido', label: 'Apellidos', required: true, type: 'string' },

    // 3. LA CLAVE DEL ERROR (Tu interfaz usa 'nroIdentificacion')
    { key: 'nroIdentificacion', label: 'Nro. Identificación (Cédula)', required: true, type: 'string' },

    // 4. EMAIL (Tu interfaz usa 'emailPersonal')
    { key: 'emailPersonal', label: 'Email Personal', required: true, type: 'string' },

    // 5. SALARIO (Tu interfaz usa 'salario')
    { key: 'salario', label: 'Salario Base', required: false, type: 'number' },

    // 6. FECHAS (Tu interfaz usa 'fechaInicio')
    { key: 'fechaInicio', label: 'Fecha Inicio', required: false, type: 'date' },
    { key: 'cargoNombre', label: 'Nombre del Cargo (Ej: Contador)', required: false, type: 'string' },
  ];

  rawJsonData: any[] = [];
  sourceKeys: string[] = [];
  fieldMapping: { [key: string]: string } = {}; // { 'nombres': 'First Name' }

  isProcessing = false;
  importResult: BulkImportResponse | null = null;

  // PASO 1: Leer JSON
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const json = JSON.parse(e.target.result);
        if (Array.isArray(json) && json.length > 0) {
          this.rawJsonData = json;
          this.sourceKeys = Object.keys(json[0]);
          this.autoMapFields();
        } else {
          this.snackBar.open('El archivo debe ser un Array JSON', 'Cerrar');
        }
      } catch (err) {
        this.snackBar.open('Error: JSON inválido', 'Cerrar');
      }
    };
    reader.readAsText(file);
  }

  // Auto-conectar columnas si tienen nombres similares
  autoMapFields() {
    this.systemFields.forEach(field => {
      const match = this.sourceKeys.find(k => k.toLowerCase().includes(field.key.toLowerCase()));
      if (match) this.fieldMapping[field.key] = match;
    });
  }

  // PASO 3: Procesar y Enviar
  processImport() {
    this.isProcessing = true;

    // 1. Mapeo y Limpieza
    const cleanEmployees = this.rawJsonData.map(row => {
      const newEmp: any = {};

      this.systemFields.forEach(field => {
        const sourceKey = this.fieldMapping[field.key];
        // Si el usuario mapeó esa columna, limpiamos y asignamos
        if (sourceKey) {
          newEmp[field.key] = this.cleanValue(row[sourceKey], field.type);
        }
      });

      // --- VALORES POR DEFECTO OBLIGATORIOS ---
      newEmp.estado = 'ACTIVO';

      // 👇 IMPORTANTE: Tu interfaz requiere esto, le ponemos un valor por defecto
      // Si no lo pones, el backend podría rechazarlo.
      newEmp.tipoIdentificacion = 'CEDULA';

      return newEmp;
    });

    // 2. Validación rápida (CORREGIDA CON TUS NOMBRES REALES)
    // Usamos 'nombre' y 'nroIdentificacion' tal como están en tu interfaz Employee
    const hasMissingData = cleanEmployees.some(e =>
      !e.nombre || !e.apellido || !e.nroIdentificacion || !e.emailPersonal
    );

    if (hasMissingData) {
      this.snackBar.open('Error: Faltan campos obligatorios (Nombre, Apellido, Cédula o Email) por mapear.', 'Cerrar');
      this.isProcessing = false;
      return;
    }

    // 3. Enviar al Gateway
    this.employeeService.importBulk(cleanEmployees).subscribe({
      next: (res) => {
        this.importResult = res;
        this.isProcessing = false;
        // Opcional: Si quieres mostrar un snackbar de éxito rápido
        if (res.errors === 0) {
          this.snackBar.open('¡Importación exitosa!', 'Cerrar', { duration: 3000 });
        }
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error de comunicación con el servidor', 'Cerrar');
        this.isProcessing = false;
      }
    });
  }

  // Limpiador de datos sucios (Currency, Fechas, espacios)
  cleanValue(val: any, type: string): any {
    if (val === null || val === undefined || val === '') return null;

    if (type === 'string') {
      return String(val).trim();
    }

    if (type === 'number') {
      if (typeof val === 'string') {
        // Limpia simbolos de moneda y comas ($ 1,200.00 -> 1200.00)
        return parseFloat(val.replace(/[^0-9.-]+/g, ''));
      }
      return Number(val);
    }

    if (type === 'date') {
      // 1. Intentamos crear la fecha
      const date = new Date(val);

      // 2. Verificamos si es válida (si date.getTime() es NaN, es inválida)
      if (isNaN(date.getTime())) {
        return null; // O devuelve la fecha actual si prefieres: new Date().toISOString().split('T')[0]
      }

      // 3. Formateamos a YYYY-MM-DD para evitar problemas de zona horaria y formatos raros
      // Usamos toISOString pero cortamos la hora
      return date.toISOString().split('T')[0];
    }

    return val;
  }
}