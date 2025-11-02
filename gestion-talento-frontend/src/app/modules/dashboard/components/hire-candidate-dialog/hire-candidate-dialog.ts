import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-hire-candidate-dialog',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatSelectModule, MatIconModule ],
  templateUrl: './hire-candidate-dialog.html',
  styleUrls: ['./hire-candidate-dialog.scss']
})
export class HireCandidateDialog {
  hireForm: FormGroup;
  // TODO: Cargar estas plantillas desde la API (RF-39-01)
  onboardingTemplates = [
    { id: 'tmpl-dev', name: 'Onboarding Desarrollo TI' },
    { id: 'tmpl-mkt', name: 'Onboarding Marketing' },
    { id: 'tmpl-gen', name: 'Onboarding General' }
  ];

  constructor(
    public dialogRef: MatDialogRef<HireCandidateDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { candidateName: string }
  ) {
    this.hireForm = this.fb.group({
      onboardingTemplateId: [null, Validators.required],
      // 'contractFile': [null] // (Comentado - RF17 Excluido por ahora)
    });
  }

  onCancel(): void { this.dialogRef.close(); }
  onConfirmHire(): void {
    if (this.hireForm.valid) {
      this.dialogRef.close(this.hireForm.value); // Devuelve { onboardingTemplateId: '...' }
    }
  }
}