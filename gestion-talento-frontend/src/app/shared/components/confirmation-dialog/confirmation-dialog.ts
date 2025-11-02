import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; // Optional: for an icon

// Interface for data passed to the dialog
export interface ConfirmationDialogData {
  title?: string;
  message: string;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './confirmation-dialog.html',
  styleUrls: ['./confirmation-dialog.scss']
})
export class ConfirmationDialog {
  // Set default values using the injected data
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData
  ) {
    // Assign default values if not provided
    this.title = data.title || 'Confirmación';
    this.message = data.message;
    this.confirmButtonText = data.confirmButtonText || 'Confirmar';
    this.cancelButtonText = data.cancelButtonText || 'Cancelar';
  }

  onConfirm(): void {
    // Close the dialog, return true
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this.dialogRef.close(false);
  }
}