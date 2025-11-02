import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Needed for [(ngModel)]
// Material Imports
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox'; // For 'Required' checkbox
import { MatIconModule } from '@angular/material/icon';     // For icons (add, delete)
import { MatTooltipModule } from '@angular/material/tooltip'; // For tooltips
// Shared Header
import { SubpageHeader } from '../../../../../shared/components/subpage-header/subpage-header'; // Adjust path

// Interface defining a custom field structure
interface CustomField {
  id: number; // Unique identifier (temporary for frontend)
  label: string; // Display name shown to users
  type: 'text' | 'number' | 'date' | 'select'; // Data type
  options?: string; 
  required: boolean;
  placeholder?: string;
}

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, // Add FormsModule
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule, // Add Checkbox
    MatIconModule,     // Add Icon
    MatTooltipModule,  // Add Tooltip
    SubpageHeader// Add Shared Header
  ],
  templateUrl: './profile-settings.html',
  styleUrls: ['./profile-settings.scss']
})
export class ProfileSettings {
  // Sample custom fields (load from backend in real app)
  customFields: CustomField[] = [
    { id: 1, label: 'Talla de Camisa', type: 'select', options: 'S, M, L, XL, XXL', required: false, placeholder: 'Selecciona talla' },
    { id: 2, label: 'Número de Licencia', type: 'text', required: false, placeholder: 'Ej: L00-...' },
    { id: 3, label: 'Fecha Último Examen Médico', type: 'date', required: true, placeholder: '' }
  ];

  // Available field types for the dropdown
  fieldTypes: Array<CustomField['type']> = ['text', 'number', 'date', 'select'];

  constructor() {}

  // Function to add a new empty field row
  addCustomField(): void {
    console.log('Adding new custom field...');
    this.customFields.push({
      id: Date.now(), // Temporary unique ID
      label: '',
      type: 'text', // Default type
      options: '',
      required: false,
      placeholder: ''
    });
  }

  // Function to remove a field row
  removeCustomField(fieldId: number): void {
    console.log('Removing field:', fieldId);
    this.customFields = this.customFields.filter(f => f.id !== fieldId);
    // TODO: Call API to delete the field (might require confirmation)
  }

  // Function to save all custom field configurations
  saveCustomFields(): void {
    // Basic validation (e.g., check for empty labels)
    const isValid = this.customFields.every(f => f.label.trim() !== '');
    if (!isValid) {
      console.error('Error: Field labels cannot be empty.');
      // Optionally show a user-friendly error message (e.g., using MatSnackBar)
      return;
    }
    console.log('Saving custom fields:', this.customFields);
    // TODO: Call API to save the entire `customFields` array
    // Show success message
  }
}