import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

// Material Modules
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';

// Componentes y Servicios
import { AddPayrollItemDialog } from '../../components/add-payroll-item-dialog/add-payroll-item-dialog';
import { ConfirmationDialog } from '../../../../shared/components/confirmation-dialog/confirmation-dialog';
import { EmployeesService } from '../../services/employees';
import { CatalogService } from '../../services/catalog';
import { ProcessPayrollDialog } from '../../components/process-payroll-dialog/process-payroll-dialog'; // Importar el componente nuevo
import {
  PayrollService,
  ConceptoNomina,
  CreateNovedadDto
} from '../../services/payroll'; // Importamos las interfaces correctas


import { AuthService } from '../../../auth/services/auth';
import { PERMISSIONS } from '../../../../shared/constants/permissions';

// Interfaz local para mostrar en la tabla
interface EmployeePayroll {
  id: string;
  name: string;
  role: string;
  nroIdentificacion: string;
  tipoIdentificacion: string;
  department: string;
  salary: number;
  lastRevision: string;
}

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [
    CommonModule, RouterModule, MatDialogModule, FormsModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatIconModule, MatCheckboxModule, MatSnackBarModule, MatTooltipModule,
    MatMenuModule
  ],
  templateUrl: './payroll.html',
  styleUrls: ['./payroll.scss']
})
export class Payroll implements OnInit {
  // Inyecciones
  private employeesService = inject(EmployeesService);
  private payrollService = inject(PayrollService);
  private catalogService = inject(CatalogService);
  private snackBar = inject(MatSnackBar);
  public dialog = inject(MatDialog);
  private authService = inject(AuthService);
  P = PERMISSIONS;

  // Filtros
  searchTerm: string = '';
  selectedDepartment: string = 'todos';
  departments: string[] = [];

  // Datos
  allEmployees: EmployeePayroll[] = [];
  lastProcessedPeriodId: string | null = null;
  filteredEmployees: EmployeePayroll[] = [];

  // Selección y Totales
  totals = { count: 0, totalSalary: 0 };
  selection = new SelectionModel<EmployeePayroll>(true, []);

  // Catálogo de Novedades (Ahora dinámico)
  availablePayrollItems: ConceptoNomina[] = [];

  ngOnInit(): void {
    this.loadData();
    this.loadConcepts(); // Cargar conceptos reales de la BD
    this.checkLastProcessedPeriod();
  }

  // --- CARGA DE DATOS ---

  can(permission: string): boolean {
    return this.authService.hasPermission(permission);
  }
  loadConcepts() {
    this.payrollService.getConceptos().subscribe({
      next: (data) => {
        this.availablePayrollItems = data;
      },
      error: (err) => console.error('Error cargando conceptos de nómina:', err)
    });
  }

  loadData() {
    // 1. Cargar Departamentos (para el filtro)
    this.catalogService.getDepartments().subscribe(depts => {
      this.departments = depts.map(d => d.nombre);
    });

    // 2. Cargar Empleados Reales
    this.employeesService.getEmployees().subscribe({
      next: (data) => {
        // Mapeamos la data del backend a la estructura de la tabla
        this.allEmployees = data.map(emp => {

          // A. BUSCAR CONTRATO VIGENTE (Tu lógica)
          const contratoVigente = emp.contratos?.find(c =>
            c.estado === 'Vigente' || c.estado === 'Activo'
          );

          // B. EXTRAER DATOS DEL CONTRATO
          const salarioReal = contratoVigente ? Number(contratoVigente.salario) : 0;

          // Usamos la fecha del contrato, o la de contratación del empleado, o hoy.
          const fechaRef = contratoVigente?.fechaInicio || emp.fechaInicio || (emp as any).createdAt || new Date().toISOString();

          return {
            id: emp.id,
            name: `${emp.nombre} ${emp.apellido}`,
            role: emp.cargo?.nombre || 'Sin Cargo',
            nroIdentificacion: emp.nroIdentificacion || 'Sin Identificación',
            tipoIdentificacion: emp.tipoIdentificacion || 'Sin Tipo',
            department: emp.cargo?.departamento?.nombre || 'Sin Depto',
            salary: salarioReal,
            lastRevision: fechaRef
          };
        });

        this.applyFilters();
      },
      error: (err) => console.error('Error cargando empleados:', err)
    });
  }

  // --- FILTROS Y CÁLCULOS ---

  applyFilters(): void {
    let temp = [...this.allEmployees];
    const search = this.searchTerm.toLowerCase();

    if (this.searchTerm) {
      temp = temp.filter(e =>
        e.name.toLowerCase().includes(search) ||
        e.role.toLowerCase().includes(search)
      );
    }

    if (this.selectedDepartment !== 'todos') {
      temp = temp.filter(e => e.department === this.selectedDepartment);
    }

    this.filteredEmployees = temp;
    this.calculateTotals();
  }

  calculateTotals(): void {
    this.totals.count = this.filteredEmployees.length;
    this.totals.totalSalary = this.filteredEmployees.reduce((sum, e) => sum + e.salary, 0);
  }

  // --- SELECCIÓN ---

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.filteredEmployees.length;
    return numSelected === numRows;
  }

  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    this.selection.select(...this.filteredEmployees);
  }

  // --- ACCIÓN: REGISTRAR NOVEDAD (Individual) ---

  openAddItemDialog(employee: EmployeePayroll): void {
    const dialogRef = this.dialog.open(AddPayrollItemDialog, {
      width: '450px',
      data: {
        employeeName: employee.name,
        // Pasamos la lista real cargada del backend
        availableItems: this.availablePayrollItems
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Construimos el DTO correcto para el backend
        const dto: CreateNovedadDto = {
          empleadoId: employee.id,
          conceptoId: result.item.id, // Usamos el ID del concepto seleccionado
          monto: result.amount,
          fecha: result.applicationDate, // Debe ser string YYYY-MM-DD (asegurado en el modal)
          observacion: result.comments
        };

        this.payrollService.createNovedad(dto).subscribe({
          next: () => this.snackBar.open('Novedad registrada correctamente', 'Cerrar', { duration: 3000 }),
          error: () => this.snackBar.open('Error al guardar novedad', 'Cerrar')
        });
      }
    });
  }

  // --- ACCIÓN: REGISTRAR NOVEDAD (Masiva) ---

  openBulkAddItemDialog(): void {
    if (this.selection.isEmpty()) return;

    const dialogRef = this.dialog.open(AddPayrollItemDialog, {
      width: '450px',
      data: {
        selectedCount: this.selection.selected.length,
        availableItems: this.availablePayrollItems
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const confirmRef = this.dialog.open(ConfirmationDialog, {
          width: '400px',
          data: {
            title: 'Confirmar Acción Masiva',
            message: `Se aplicará el concepto "${result.item.nombre}" a ${this.selection.selected.length} empleados. ¿Continuar?`,
            confirmButtonText: 'Sí, aplicar'
          }
        });

        confirmRef.afterClosed().subscribe(confirmed => {
          if (confirmed) {
            this.processBulkItems(result);
          }
        });
      }
    });
  }

  // Procesa la lista y envía al backend
  processBulkItems(resultData: any) {
    let completed = 0;
    const total = this.selection.selected.length;
    let errors = 0;

    this.selection.selected.forEach(emp => {
      const dto: CreateNovedadDto = {
        empleadoId: emp.id,
        conceptoId: resultData.item.id,
        monto: resultData.amount,
        fecha: resultData.applicationDate,
        observacion: `Masivo: ${resultData.comments || ''}`
      };

      this.payrollService.createNovedad(dto).subscribe({
        next: () => {
          completed++;
          this.checkBulkCompletion(completed, total, errors);
        },
        error: () => {
          completed++;
          errors++;
          this.checkBulkCompletion(completed, total, errors);
        }
      });
    });
  }

  checkBulkCompletion(completed: number, total: number, errors: number) {
    if (completed === total) {
      this.selection.clear();
      if (errors === 0) {
        this.snackBar.open(`¡Éxito! ${total} novedades registradas.`, 'Cerrar', { duration: 4000 });
      } else {
        this.snackBar.open(`Proceso terminado con ${errors} errores.`, 'Cerrar', { duration: 5000 });
      }
    }
  }
  // ==========================================
  // LÓGICA DE EXPORTACIÓN (NUEVO)
  // ==========================================
  exportToCsv(): void {
    const dataToExport = this.filteredEmployees.map(emp => ({
      'ID Sistema': emp.id,
      'Cédula/ID': emp.nroIdentificacion !== 'S/N' ? `\t${emp.nroIdentificacion}` : '',
      'Tipo Identificación': emp.tipoIdentificacion,
      'Nombre Completo': emp.name,
      'Cargo': emp.role,
      'Departamento': emp.department,
      'Salario Base': emp.salary,
      'Fecha Referencia': this.formatDate(emp.lastRevision),
      'Fecha de Reporte': new Date().toLocaleDateString()
    }));

    if (dataToExport.length === 0) {
      this.snackBar.open('No hay datos para exportar', 'Cerrar', { duration: 3000 });
      return;
    }

    // 2. Definir encabezados (Keys del objeto)
    const headers = Object.keys(dataToExport[0]);

    // 3. Convertir a formato CSV
    const csvContent = this.convertToCSV(dataToExport, headers);

    // 4. Descargar el archivo
    this.downloadFile(csvContent, `Nomina_Empleados_${new Date().toISOString().split('T')[0]}.csv`);
  }

  // Helper: Convierte Array de Objetos a String CSV
  private convertToCSV(objArray: any[], headerList: string[]): string {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    // Agregar fila de encabezados
    str += headerList.join(',') + '\r\n';

    // Agregar filas de datos
    for (let i = 0; i < array.length; i++) {
      let line = '';
      for (const index in headerList) {
        const head = headerList[index];
        let value = array[i][head];

        // Manejar strings que puedan tener comas (encerrar en comillas)
        if (typeof value === 'string' && value.includes(',')) {
          value = `"${value}"`;
        }

        if (line !== '') line += ',';
        line += value;
      }
      str += line + '\r\n';
    }
    return str;
  }

  // Helper: Genera y descarga el Blob
  private downloadFile(csvData: string, filename: string) {
    const blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' }); // \ufeff es BOM para que Excel lea tildes correctamente
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  }

  // Helper simple de fecha
  private formatDate(isoDate: string): string {
    if (!isoDate) return '';
    return new Date(isoDate).toLocaleDateString();
  }

  openProcessDialog() {
    const dialogRef = this.dialog.open(ProcessPayrollDialog, {
      width: '450px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(periodoId => {
      if (periodoId) {
        this.runPayrollProcess(periodoId);
      }
    });
  }

  runPayrollProcess(periodoId: string) {
    // Mostramos un loading global o un snackbar
    const snackRef = this.snackBar.open('Procesando nómina, por favor espera...', '', { duration: 0 }); // Indefinido

    this.payrollService.procesarNomina(periodoId).subscribe({
      next: (res) => {
        snackRef.dismiss();
        this.snackBar.open(`¡Éxito! ${res.message}`, 'Cerrar', { duration: 5000, panelClass: ['success-snackbar'] });

        // Aquí podrías recargar la tabla para mostrar los valores calculados si tu tabla soporta ver historial
        this.loadData();
      },
      error: (err) => {
        snackRef.dismiss();
        console.error(err);
        this.snackBar.open(err.error?.message || 'Error al procesar nómina', 'Cerrar', { duration: 5000 });
      }
    });
  }

  // ==========================================
  // 1. EXPORTAR REPORTE GENERAL (CSV / EXCEL)
  // ==========================================
  exportGeneralReport(periodoId: string) {
    this.payrollService.getReporteNomina(periodoId).subscribe({
      next: (data) => {
        // Aplanamos la data para el CSV (1 fila por empleado)
        const csvData = data.map(item => ({
          'Cédula': item.empleado.cedula,
          'Empleado': `${item.empleado.nombre} ${item.empleado.apellido}`,
          'Cargo': item.empleado.cargo,
          'Total Ingresos': item.totales.ingresos,
          'Total Egresos': item.totales.egresos,
          'NETO A PAGAR': item.totales.neto
        }));

        const headers = Object.keys(csvData[0]);
        const csvContent = this.convertToCSV(csvData, headers);
        this.downloadFile(csvContent, `Reporte_General_${periodoId}.csv`);

        this.snackBar.open('Reporte General descargado', 'Cerrar', { duration: 3000 });
      },
      error: () => this.snackBar.open('Error al generar reporte', 'Cerrar')
    });
  }

  // ==========================================
  // 2. EXPORTAR ROLES INDIVIDUALES (PDF)
  // ==========================================
  exportIndividualPayslips(periodoId: string) {
    this.payrollService.getReporteNomina(periodoId).subscribe({
      next: (nominas) => {
        const doc = new jsPDF();
        let yPos = 0;

        nominas.forEach((nomina, index) => {
          // Si no es el primero, agregamos nueva página
          if (index > 0) doc.addPage();

          // --- CABECERA ---
          doc.setFontSize(16);
          doc.text('ROL DE PAGOS INDIVIDUAL', 105, 20, { align: 'center' });

          doc.setFontSize(10);
          doc.text(`Empleado: ${nomina.empleado.nombre} ${nomina.empleado.apellido}`, 14, 40);
          doc.text(`Cédula: ${nomina.empleado.cedula}`, 14, 46);
          doc.text(`Cargo: ${nomina.empleado.cargo}`, 14, 52);

          // Fecha reporte (derecha)
          doc.text(`Fecha Emisión: ${new Date().toLocaleDateString()}`, 150, 40);

          // --- TABLA DE DETALLES ---
          // Preparamos datos para la tabla: Ingresos a la izquierda, Egresos a la derecha
          const maxRows = Math.max(nomina.detalles.ingresos.length, nomina.detalles.egresos.length);
          const bodyData = [];

          for (let i = 0; i < maxRows; i++) {
            const ing = nomina.detalles.ingresos[i] || { concepto: '', valor: '' };
            const egr = nomina.detalles.egresos[i] || { concepto: '', valor: '' };

            bodyData.push([
              ing.concepto,
              ing.valor ? `$${Number(ing.valor).toFixed(2)}` : '',
              egr.concepto,
              egr.valor ? `$${Number(egr.valor).toFixed(2)}` : ''
            ]);
          }

          // Dibujar Tabla
          autoTable(doc, {
            startY: 60,
            head: [['INGRESOS', 'Monto', 'EGRESOS', 'Monto']],
            body: bodyData,
            theme: 'grid',
            headStyles: { fillColor: [63, 81, 181] }, // Tu color primario (Indigo)
            styles: { fontSize: 9 },
            columnStyles: {
              0: { cellWidth: 60 }, // Concepto Ingreso
              1: { cellWidth: 30, halign: 'right' }, // Valor Ingreso
              2: { cellWidth: 60 }, // Concepto Egreso
              3: { cellWidth: 30, halign: 'right' }  // Valor Egreso
            }
          });

          // Obtener posición final de la tabla
          // @ts-ignore
          yPos = doc.lastAutoTable.finalY + 10;

          // --- TOTALES ---
          doc.setFontSize(10);
          doc.setFont('helvetica', 'bold');

          doc.text(`Total Ingresos: $${Number(nomina.totales.ingresos).toFixed(2)}`, 14, yPos);
          doc.text(`Total Egresos: $${Number(nomina.totales.egresos).toFixed(2)}`, 110, yPos);

          yPos += 15;
          doc.setFontSize(12);
          doc.setFillColor(230, 230, 230); // Fondo gris claro
          doc.rect(14, yPos - 6, 180, 10, 'F'); // Caja de fondo
          doc.text(`LÍQUIDO A RECIBIR: $${Number(nomina.totales.neto).toFixed(2)}`, 105, yPos, { align: 'center' });

          // --- FIRMAS ---
          yPos += 40;
          doc.setLineWidth(0.5);
          doc.line(30, yPos, 80, yPos); // Línea Firma 1
          doc.line(130, yPos, 180, yPos); // Línea Firma 2

          doc.setFontSize(8);
          doc.setFont('helvetica', 'normal');
          doc.text('Firma Empleador / RRHH', 55, yPos + 5, { align: 'center' });
          doc.text('Firma Empleado', 155, yPos + 5, { align: 'center' });

        });

        // Descargar PDF único con todas las páginas
        doc.save(`Roles_Pago_${periodoId}.pdf`);
        this.snackBar.open('Roles de pago generados', 'Cerrar', { duration: 3000 });
      },
      error: (err) => console.error(err)
    });
  }
  checkLastProcessedPeriod() {
    this.payrollService.getPeriodos().subscribe({
      next: (periodos) => {
        console.log('📦 1. Todos los periodos recibidos:', periodos);

        // Filtro robusto: Ignora mayúsculas y espacios
        const procesados = periodos.filter(p => {
          // Protección contra nulos
          if (!p.estado) return false;

          const estadoLimpio = p.estado.trim().toLowerCase();
          return estadoLimpio === 'procesado' || estadoLimpio === 'cerrado';
        });

        console.log('✅ 2. Periodos filtrados (Procesados):', procesados);

        if (procesados.length > 0) {
          // Ordenar: El más reciente primero
          procesados.sort((a, b) => new Date(b.fechaFin).getTime() - new Date(a.fechaFin).getTime());

          this.lastProcessedPeriodId = procesados[0].id;
          console.log('🎯 3. ID ASIGNADO al botón:', this.lastProcessedPeriodId);
        } else {
          console.warn('⚠️ 3. No se encontró ningún periodo procesado. El botón seguirá gris.');
          this.lastProcessedPeriodId = null;
        }
      },
      error: (err) => console.error('❌ Error trayendo periodos:', err)
    });
  }
}