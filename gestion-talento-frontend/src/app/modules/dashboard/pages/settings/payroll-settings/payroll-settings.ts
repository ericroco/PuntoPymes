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
import { PayrollService, ConceptoNomina, PeriodoNomina } from '../../../services/payroll'; // Asegúrate de la ruta
import { CompanyConfigService } from '../../../services/company-config';

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
  private configService = inject(CompanyConfigService);

  periodos: PeriodoNomina[] = [];
  newPeriodStart: Date = new Date();
  newPeriodEnd: Date = new Date();

  // Configuración General
  settings = {
    payFrequency: 'mensual',
    overtimeMultiplier: 1.5,
  };

  payFrequencies = [
    { value: 'semanal', label: 'Semanal' },
    { value: 'quincenal', label: 'Quincenal' },
    { value: 'mensual', label: 'Mensual' }
  ];

  // Lista de Conceptos
  payrollItems: ConceptoNomina[] = [];

  // Formulario Nuevo Item
  newItemName: string = '';
  newItemType: 'Ingreso' | 'Egreso' = 'Ingreso';
  newItemIsRecurring: boolean = false;
  newItemPercent: number | null = null; // Cambiamos a number para manejar %

  // 👇 NUEVO: Para distinguir $ vs %
  calculationType: 'fijo' | 'porcentaje' = 'fijo';

  // 👇 NUEVO: Aquí guardaremos el número (ya sea 20 o 9.45)
  newItemValue: number | null = null;

  constructor() { }

  ngOnInit() {
    this.loadConcepts();
    this.loadPeriodos();

    this.configService.getConfig().subscribe({
      next: (config) => {
        // Leemos la sección 'nomina' del JSON
        const nominaConfig = config.nomina || {};

        // Asignamos a las variables locales, con valores por defecto si es null
        // OJO: Hay que castear 'payFrequency' porque en la config viene string genérico
        this.settings.payFrequency = (nominaConfig.frecuenciaPago as string) || 'mensual';
        this.settings.overtimeMultiplier = nominaConfig.multiplicadorHorasExtra || 1.5;

        // Recalculamos fechas con la data cargada
        this.calculateNextPeriodDates();
      },
      error: (err) => console.error('Error cargando configuración de empresa', err)
    });
  }

  // 👇 4. GUARDAMOS EN LA TABLA EMPRESAS (Auth Microservice)
  savePayrollSettings(): void {

    // Armamos el objeto parcial que espera el servicio updateConfig
    const configToSend = {
      nomina: {
        frecuenciaPago: this.settings.payFrequency as 'mensual' | 'quincenal' | 'semanal',
        multiplicadorHorasExtra: this.settings.overtimeMultiplier
      }
    };

    this.configService.updateConfig(configToSend).subscribe({
      next: () => {
        this.snackBar.open('Configuración de nómina guardada', 'Cerrar', { duration: 3000 });
        // Recalcular fechas por si cambió la frecuencia
        this.calculateNextPeriodDates();
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al guardar configuración', 'Cerrar');
      }
    });
  }

  // --- 1. CARGAR CONCEPTOS ---
  loadConcepts() {
    // Usamos el servicio nuevo que trae los Beneficios
    // Si tu servicio aún se llama getConceptos(), asegúrate que apunte al endpoint correcto
    this.payrollService.getConceptos().subscribe({
      next: (data) => {
        this.payrollItems = data;
      },
      error: (err) => console.error('Error al cargar conceptos:', err)
    });
  }

  // --- 2. AGREGAR CONCEPTO (LÓGICA CORREGIDA) ---
  addPayrollItem(): void {
    if (!this.newItemName.trim()) return;

    // 1. Calcular lógica de negocio
    const isAutomatic = this.newItemIsRecurring && this.newItemPercent != null && this.newItemPercent > 0;

    let montoFinal = undefined;
    if (this.newItemIsRecurring && this.newItemValue != null && this.newItemValue > 0) {
      if (this.calculationType === 'porcentaje') {
        montoFinal = this.newItemValue / 100; // 9.45 -> 0.0945
      } else {
        montoFinal = this.newItemValue; // 20 -> 20
      }
    }

    // 2. Payload COMPLETO (Necesario para que salga en la lista)
    const payload = {
      nombre: this.newItemName,
      descripcion: 'Creado desde configuración',

      // Mapeamos para el backend nuevo
      indicador: this.newItemType === 'Ingreso' ? 'Ingreso' : 'Descuento',

      // Mantenemos el tipo viejo para compatibilidad del DTO, pero usamos 'Monetario'
      // (O usa this.newItemType si tu backend ya acepta 'Ingreso' en el campo tipo)
      tipo: 'Monetario',

      // 👇 ESTO ES LO QUE HACE QUE APAREZCA EN LA LISTA
      esRecurrente: this.newItemIsRecurring,

      esAutomatico: isAutomatic,
      montoEstimado: montoFinal
    };

    console.log('✅ Enviando Payload Completo:', payload);

    // Usamos 'as any' para evitar conflictos de tipado con la interfaz vieja del frontend
    this.payrollService.createConcepto(payload as any).subscribe({
      next: (createdItem) => {
        this.payrollItems.push(createdItem);
        this.snackBar.open('Beneficio recurrente creado', 'Cerrar', { duration: 3000 });

        // Resetear formulario
        this.newItemName = '';
        this.newItemType = 'Ingreso';
        this.newItemIsRecurring = false;
        this.newItemValue = null;
        this.newItemPercent = null;
      },
      error: (err) => {
        console.error('❌ ERRORES:', err.error);
        const errorMsg = Array.isArray(err.error.message) ? err.error.message.join(', ') : err.error.message;
        this.snackBar.open(`Error: ${errorMsg}`, 'Cerrar', { duration: 5000 });
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

  // --- 4. CÁLCULO DE FECHAS ---
  calculateNextPeriodDates() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();

    this.newPeriodStart = new Date(year, month, 1);
    this.newPeriodEnd = new Date(year, month + 1, 0);

    if (this.settings.payFrequency === 'quincenal') {
      if (today.getDate() <= 15) {
        this.newPeriodEnd = new Date(year, month, 15);
      } else {
        this.newPeriodStart = new Date(year, month, 16);
      }
    }
  }

  // --- 5. CREAR PERÍODO ---
  createPeriodo() {
    if (!this.newPeriodStart || !this.newPeriodEnd) return;

    const dto = {
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

  // --- 6. ELIMINAR PERÍODO ---
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
}