import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCard, MatCardModule } from '@angular/material/card';

// Interface para los detalles de la vacante (simplificada)
interface VacancyDetails {
  id: string;
  title: string;
  department: string;
  location: string;
  description: string; // HTML o texto plano
  requirements: string[];
}

@Component({
  selector: 'app-vacancy-public-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  templateUrl: './vacancy-public-page.html',
  styleUrls: ['./vacancy-public-page.scss']
})
export class VacancyPublicPage implements OnInit {

  vacancyId: string | null = null;
  vacancy: VacancyDetails | null = null; // Para guardar los detalles
  applicationForm: FormGroup;
  selectedFile: File | null = null;
  fileName: string = '';
  
  isLoading: boolean = true; // Para simular carga
  isSubmitting: boolean = false; // Para el botón de enviar
  submissionComplete: boolean = false; // Para mostrar mensaje de éxito

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.applicationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      cvFile: [null, Validators.required] // Para el control del archivo
    });
  }

  ngOnInit(): void {
    this.vacancyId = this.route.snapshot.paramMap.get('id');
    console.log("Cargando página pública para vacante ID:", this.vacancyId);
    
    // --- TODO: Llamar API pública para obtener detalles de la vacante ---
    // Simulación de carga
    setTimeout(() => {
      // Simulación de datos (basado en el ID de la ruta)
      if (this.vacancyId === 'dev-frontend-sr') {
        this.vacancy = {
          id: 'dev-frontend-sr',
          title: 'Desarrollador Frontend Senior',
          department: 'Tecnología',
          location: 'Trabajo Remoto',
          description: 'Estamos buscando un Desarrollador Frontend con experiencia para unirse a nuestro equipo. Serás responsable de construir la próxima generación de nuestra plataforma SaaS de RRHH, creando interfaces de usuario limpias, eficientes y escalables.',
          requirements: [
            '5+ años de experiencia con Angular (TypeScript).',
            'Experiencia profunda con Angular Material y SCSS.',
            'Conocimiento de arquitecturas standalone y NgRx (deseable).',
            'Experiencia construyendo tableros y visualización de datos.'
          ]
        };
      } else {
        // Vacante no encontrada (placeholder)
        this.vacancy = { id: 'not-found', title: 'Vacante no encontrada', department: '', location: '', description: 'La vacante que buscas no existe o ya ha sido cerrada.', requirements: [] };
      }
      this.isLoading = false;
    }, 1000); // Simula 1 segundo de carga
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      // Validar tamaño o tipo si es necesario
      this.selectedFile = file;
      this.fileName = file.name;
      this.applicationForm.patchValue({ cvFile: file });
      this.applicationForm.get('cvFile')?.updateValueAndValidity();
    }
  }

  onSubmit(): void {
    if (this.applicationForm.invalid || !this.selectedFile) {
      this.applicationForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    console.log('Enviando postulación:', {
      name: this.applicationForm.value.name,
      email: this.applicationForm.value.email,
      phone: this.applicationForm.value.phone,
      file: this.selectedFile
    });

    // --- TODO: Llamar API (Endpoint Público) para subir el CV y los datos ---
    // (Usar FormData para enviar el archivo)
    
    // Simulación de envío exitoso
    setTimeout(() => {
      this.isSubmitting = false;
      this.submissionComplete = true; // Muestra el mensaje de éxito
    }, 2000); // Simula 2 segundos de subida
  }
}