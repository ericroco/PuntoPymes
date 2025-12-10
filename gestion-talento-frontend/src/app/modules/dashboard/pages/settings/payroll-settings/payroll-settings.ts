import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

// Components & Services
import { SubpageHeader } from '../../../../../shared/components/subpage-header/subpage-header';
import { PayrollService, ConceptoNomina, PeriodoNomina } from '../../../services/payroll';

@Component({
  selector: 'app-payroll-settings',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatIconModule, MatDividerModule,
    MatListModule, MatTooltipModule, SubpageHeader, MatCheckboxModule,
    MatSnackBarModule, MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './payroll-settings.html',
  styleUrls: ['./payroll-settings.scss']
})
export class PayrollSettings implements OnInit {
  private payrollService = inject(PayrollService);
  private snackBar = inject(MatSnackBar);

  periodos: PeriodoNomina[] = [];
  newPeriodStart: Date = new Date(); // Para los inputs de fecha
  newPeriodEnd: Date = new Date();

  // Configuración General (Frecuencia, Horas Extra)
  // TODO: Esto debería venir de otro endpoint si decides guardarlo (ej: PeriodoNomina o ConfigEmpresa)
  settings = {
    payFrequency: 'mensual',
    overtimeMultiplier: 1.5,
  };

  payFrequencies = [
    { value: 'semanal', label: 'Semanal' },
    { value: 'quincenal', label: 'Quincenal' },
    { value: 'mensual', label: 'Mensual' }
  ];

  // Lista de Conceptos (Cargada del Backend)
  payrollItems: ConceptoNomina[] = [];

  // Formulario Nuevo Item
  newItemName: string = '';
  newItemType: 'Ingreso' | 'Egreso' = 'Ingreso';
  newItemIsRecurring: boolean = false;
  newItemFormula: string = '';

  constructor() { }

  ngOnInit() {
    this.loadConcepts();
    this.loadPeriodos();

    // 👇 1. CARGAR CONFIGURACIÓN REAL AL INICIAR
    this.payrollService.getGlobalSettings().subscribe({
      next: (config) => {
        if (config) {
          // Mapeamos lo que viene del backend a tu objeto local 'settings'
          this.settings.payFrequency = config.frecuenciaPago || 'mensual';
          this.settings.overtimeMultiplier = config.multiplicadorHorasExtra || 1.5;

          // Recalculamos las fechas del período sugerido con la nueva frecuencia
          this.calculateNextPeriodDates();
        }
      },
      error: (err) => console.error('Error cargando configuración global', err)
    });
  }

  savePayrollSettings(): void {
    const configToSend = {
      frecuenciaPago: this.settings.payFrequency,
      multiplicadorHorasExtra: this.settings.overtimeMultiplier
    };

    this.payrollService.updateGlobalSettings(configToSend).subscribe({
      next: () => {
        this.snackBar.open('Configuración global guardada correctamente', 'Cerrar', { duration: 3000 });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al guardar configuración', 'Cerrar');
      }
    });
  }
  // --- 1. CARGAR CONCEPTOS ---
  loadConcepts() {
    this.payrollService.getConceptos().subscribe({
      next: (data) => {
        this.payrollItems = data;
      },
      error: (err) => console.error('Error al cargar conceptos:', err)
    });
  }

  // --- 2. AGREGAR CONCEPTO ---
  addPayrollItem(): void {
    if (!this.newItemName.trim()) return;

    const newConcept: Partial<ConceptoNomina> = {
      nombre: this.newItemName,
      tipo: this.newItemType,
      esFijo: this.newItemIsRecurring,
      // Si es fijo, enviamos el porcentaje como string en 'formula'. Si no, null.
      formula: this.newItemIsRecurring ? this.newItemFormula.toString() : undefined
    };

    this.payrollService.createConcepto(newConcept).subscribe({
      next: (createdItem) => {
        this.payrollItems.push(createdItem);
        this.snackBar.open('Concepto creado', 'Cerrar', { duration: 3000 });

        // Resetear todo
        this.newItemName = '';
        this.newItemType = 'Ingreso';
        this.newItemIsRecurring = false;
        this.newItemFormula = ''; // Resetear fórmula
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al crear el concepto', 'Cerrar');
      }
    });
  }

  // --- 3. ELIMINAR CONCEPTO ---
  removePayrollItem(item: ConceptoNomina): void {
    if (!confirm(`¿Eliminar "${item.nombre}"? Esto no afectará nóminas pasadas.`)) return;

    this.payrollService.deleteConcepto(item.id).subscribe({
      next: () => {
        this.payrollItems = this.payrollItems.filter(i => i.id !== item.id);
        this.snackBar.open('Concepto eliminado', 'Cerrar', { duration: 3000 });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('No se puede eliminar (quizás ya tiene historial)', 'Cerrar');
      }
    });
  }

  loadPeriodos() {
    this.payrollService.getPeriodos().subscribe({
      next: (data) => this.periodos = data,
      error: (err) => console.error('Error cargando períodos', err)
    });
  }

  // --- 2. CÁLCULO AUTOMÁTICO DE FECHAS ---
  // Se ejecuta cuando cambia el select de frecuencia o al iniciar
  calculateNextPeriodDates() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 0 = Enero

    // Reiniciamos fechas base
    this.newPeriodStart = new Date(year, month, 1);
    this.newPeriodEnd = new Date(year, month + 1, 0);

    if (this.settings.payFrequency === 'quincenal') {
      // Si hoy es <= 15, sugerir 1ra quincena. Si no, 2da quincena.
      if (today.getDate() <= 15) {
        this.newPeriodEnd = new Date(year, month, 15);
      } else {
        this.newPeriodStart = new Date(year, month, 16);
      }
    }
    // Si es 'semanal', podrías agregar lógica para buscar el próximo lunes/domingo
  }

  // --- 3. CREAR PERÍODO ---
  createPeriodo() {
    if (!this.newPeriodStart || !this.newPeriodEnd) return;

    // ELIMINAMOS LA CREACIÓN DEL NOMBRE AQUÍ
    // const nombrePeriodo = ... (borrar esto)

    const dto = {
      // nombre: nombrePeriodo, <--- BORRAR ESTA LÍNEA
      fechaInicio: this.formatDate(this.newPeriodStart),
      fechaFin: this.formatDate(this.newPeriodEnd)
    };

    this.payrollService.createPeriodo(dto).subscribe({
      next: (periodo) => {
        this.periodos.push(periodo);
        this.snackBar.open('Período abierto exitosamente', 'Cerrar', { duration: 3000 });
      },
      error: (err) => {
        const msg = err.error?.message || 'Error al crear período';
        this.snackBar.open(msg, 'Cerrar', { duration: 5000 });
      }
    });
  }

  // --- 4. ELIMINAR PERÍODO ---
  deletePeriodo(periodo: PeriodoNomina) {
    if (periodo.estado !== 'Abierto') {
      this.snackBar.open('Solo se pueden eliminar períodos abiertos.', 'Cerrar');
      return;
    }

    if (!confirm(`¿Eliminar el período "${periodo.nombre}"?`)) return;

    this.payrollService.deletePeriodo(periodo.id).subscribe({
      next: () => {
        this.periodos = this.periodos.filter(p => p.id !== periodo.id);
        this.snackBar.open('Período eliminado', 'Cerrar');
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Error al eliminar', 'Cerrar')
    });
  }

  // --- HELPERS ---
  private formatDate(date: Date): string {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().split('T')[0];
  }

  private capitalize(s: string) { return s.charAt(0).toUpperCase() + s.slice(1); }
}
