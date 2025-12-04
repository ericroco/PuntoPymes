import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDivider } from '@angular/material/divider';

import { RecruitmentService, Vacancy } from '../../../modules/dashboard/services/recruitment';

@Component({
  selector: 'app-vacancy-public-page',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, RouterModule,
    MatButtonModule, MatInputModule, MatFormFieldModule, MatIconModule,
    MatSnackBarModule, MatCardModule, MatProgressSpinnerModule, MatDivider
  ],
  templateUrl: './vacancy-public-page.html',
  styleUrls: ['./vacancy-public-page.scss']
})
export class VacancyPublicPage implements OnInit {
  private route = inject(ActivatedRoute);
  private recruitmentService = inject(RecruitmentService);
  private fb = inject(FormBuilder);
  private snackBar = inject(MatSnackBar);

  vacancyId: string | null = null;
  vacancy: Vacancy | null = null;
  isLoading = true;
  isSubmitting = false;
  successMessage = false;

  applyForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    telefono: ['', [Validators.required]],
    // El archivo se maneja separado del formControl nativo para file input
  });

  selectedFile: File | null = null;

  ngOnInit(): void {
    this.vacancyId = this.route.snapshot.paramMap.get('id');
    if (this.vacancyId) {
      this.loadVacancy(this.vacancyId);
    } else {
      this.isLoading = false; // Error: Sin ID
    }
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Validar PDF
      if (file.type !== 'application/pdf') {
        this.snackBar.open('Solo se permiten archivos PDF.', 'Cerrar', { duration: 3000 });
        return;
      }
      this.selectedFile = file;
    }
  }

  onSubmit() {
    if (this.applyForm.invalid || !this.selectedFile || !this.vacancyId) return;

    this.isSubmitting = true;
    const { nombre, email, telefono } = this.applyForm.value;

    this.recruitmentService.applyToVacancy(this.vacancyId, {
      nombre, email, telefono, file: this.selectedFile
    }).subscribe({
      next: (res) => {
        console.log('Postulación exitosa:', res);
        this.isSubmitting = false;
        this.successMessage = true;
        this.snackBar.open('¡Postulación enviada con éxito!', 'Cerrar', { duration: 5000 });
      },
      error: (err) => {
        console.error('Error al postular:', err);
        this.isSubmitting = false;
        this.snackBar.open('Error al enviar tu solicitud. Intenta de nuevo.', 'Cerrar');
      }
    });
  }
  loadVacancy(id: string) {
    this.isLoading = true;

    // CAMBIO: Usamos el método público
    this.recruitmentService.getPublicVacancyById(id).subscribe({
      next: (data) => {
        this.vacancy = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.snackBar.open('Esta oferta no está disponible.', 'Cerrar');
      }
    });
  }
}