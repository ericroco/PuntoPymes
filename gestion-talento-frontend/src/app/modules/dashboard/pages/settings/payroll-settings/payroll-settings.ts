import { Component } from '@angular/core';
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
// Shared Header
import { SubpageHeader} from '../../../../../shared/components/subpage-header/subpage-header'; // Adjust path

// Interface for custom payroll items
interface PayrollItem {
  id: number;
  name: string;
  type: 'Ingreso' | 'Descuento'; // Payment or Deduction
  isRecurring: boolean; // Is it applied every pay period?
}

@Component({
  selector: 'app-payroll-settings',
  standalone: true,
  imports: [
    CommonModule, FormsModule, MatButtonModule, MatFormFieldModule,
    MatInputModule, MatSelectModule, MatIconModule, MatDividerModule,
    MatListModule, MatTooltipModule, SubpageHeader
  ],
  templateUrl: './payroll-settings.html',
  styleUrls: ['./payroll-settings.scss']
})
export class PayrollSettings {
  // Sample settings data (load from backend)
  settings = {
    payFrequency: 'quincenal', // semanal, quincenal, mensual
    overtimeMultiplier: 1.5, // Factor for overtime calculation
  };

  // List of custom payment/deduction types
  payrollItems: PayrollItem[] = [
    { id: 1, name: 'Bono Productividad', type: 'Ingreso', isRecurring: false },
    { id: 2, name: 'Comisión Ventas', type: 'Ingreso', isRecurring: false },
    { id: 3, name: 'Anticipo Salarial', type: 'Descuento', isRecurring: false },
    { id: 4, name: 'Aporte Seguro Médico Privado', type: 'Descuento', isRecurring: true }
  ];

  newItemName: string = '';
  newItemType: 'Ingreso' | 'Descuento' = 'Ingreso';

  payFrequencies = [
    { value: 'semanal', label: 'Semanal' },
    { value: 'quincenal', label: 'Quincenal' },
    { value: 'mensual', label: 'Mensual' }
  ];

  constructor() {}

  addPayrollItem(): void {
    if (this.newItemName) {
      const newItem: PayrollItem = {
        id: Date.now(), // Temp ID
        name: this.newItemName,
        type: this.newItemType,
        isRecurring: false // Default for now
      };
      this.payrollItems.push(newItem);
      this.newItemName = ''; // Clear input
      // TODO: Call API
    }
  }

  removePayrollItem(itemId: number): void {
    this.payrollItems = this.payrollItems.filter(item => item.id !== itemId);
    // TODO: Call API
  }

  savePayrollSettings(): void {
    console.log('Saving Payroll Settings:', {
      config: this.settings,
      items: this.payrollItems
    });
    // TODO: Call API Service to save both config and items
  }
}