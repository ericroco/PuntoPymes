import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Import Reactive Forms Modules
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material Imports
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'; // Optional: for icons in fields

// Interface for the data passed into the dialog
interface ContactInfoData {
  email?: string;
  phone?: string;
  address?: string;
  emergencyContact?: string;
}

@Component({
  selector: 'app-edit-contact-info-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule, // Add Reactive Forms
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule, // Add Form Field
    MatInputModule,    // Add Input
    MatIconModule      // Add Icon (Optional)
  ],
  templateUrl: './edit-contact-info-dialog.html',
  styleUrls: ['./edit-contact-info-dialog.scss']
})
export class EditContactInfoDialog implements OnInit {
  contactForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditContactInfoDialog>,
    private fb: FormBuilder,
    // Inject the current contact info passed from EmployeeProfileComponent
    @Inject(MAT_DIALOG_DATA) public data: ContactInfoData
  ) {
    // Initialize the form group
    this.contactForm = this.fb.group({
      // Email might be editable depending on company policy, add validation
      email: [this.data?.email || '', [Validators.required, Validators.email]],
      phone: [this.data?.phone || '', Validators.required], // Example: Make phone required
      address: [this.data?.address || ''], // Optional field
      emergencyContact: [this.data?.emergencyContact || ''] // Optional field
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close(); // Close without returning data
  }

  onSave(): void {
    if (this.contactForm.valid) {
      // Return the updated form values
      this.dialogRef.close(this.contactForm.value);
    } else {
      // Mark fields as touched to show errors if form is invalid on save attempt
      this.contactForm.markAllAsTouched();
    }
  }
}