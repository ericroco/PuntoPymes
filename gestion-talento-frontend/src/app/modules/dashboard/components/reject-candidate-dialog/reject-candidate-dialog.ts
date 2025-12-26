import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms'; // No se necesita Validators
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox'; // Para el checkbox
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-reject-candidate-dialog',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatIcon ],
  templateUrl: './reject-candidate-dialog.html',
  styleUrls: ['./reject-candidate-dialog.scss']
})
export class RejectCandidateDialog {
  rejectForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RejectCandidateDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { candidateName: string }
  ) {
    this.rejectForm = this.fb.group({
      reason: [''], // Motivo (opcional, para registro interno)
      sendEmail: [true] // (RF-34-03) Checkbox para enviar email
    });
  }

  onCancel(): void { this.dialogRef.close(); }
  onConfirmReject(): void {
    this.dialogRef.close(this.rejectForm.value); // Devuelve { reason: '...', sendEmail: true }
  }
}