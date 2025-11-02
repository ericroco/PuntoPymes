import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa FormControl
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card'; // Para organizar el formulario
import { MatChipsModule } from '@angular/material/chips'; // Para los requisitos
import { MatAutocompleteModule } from '@angular/material/autocomplete'; // Opcional para skills
import { FormControl } from '@angular/forms';
import { MatSpinner } from '@angular/material/progress-spinner';

// Cabecera
import { SubpageHeader } from '../../../../shared/components/subpage-header/subpage-header';

@Component({
  selector: 'app-create-vacancy',
  standalone: true,
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatIconModule, MatCardModule, MatChipsModule,
    MatAutocompleteModule, SubpageHeader, MatSpinner
  ],
  templateUrl: './create-vacancy.html',
  styleUrls: ['./create-vacancy.scss']
})
export class CreateVacancy implements OnInit {

  vacancyForm: FormGroup;
  isSubmitting: boolean = false;
  isEditMode: boolean = false;
  private vacancyId: string | null = null;
  pageTitle: string = 'Crear Nueva Vacante';

  // --- Datos de Ejemplo (TODO: Cargar desde API) ---
  availableDepartments: string[] = ['Tecnología', 'Diseño', 'Contabilidad', 'Marketing', 'RRHH'];
  // (RF-16-01) Cargar plantillas de fases configuradas
  pipelineTemplates = [
    { id: 'pipe-ti', name: 'Proceso de Selección TI (4 Fases)' },
    { id: 'pipe-mkt', name: 'Proceso de Marketing (3 Fases)' },
    { id: 'pipe-gen', name: 'Proceso General (2 Fases)' }
  ];

  // Para los Requisitos (MatChips)
  requirements: string[] = [];
  requirementCtrl = new FormControl();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.vacancyForm = this.fb.group({
      title: ['', Validators.required],
      department: [null, Validators.required],
      location: ['', Validators.required],
      pipelineTemplateId: [null, Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.vacancyId = this.route.snapshot.paramMap.get('id');

    if (this.vacancyId) {
      // --- MODO EDICIÓN ---
      this.isEditMode = true;
      this.pageTitle = 'Editar Vacante';
      console.log('Modo Edición, ID:', this.vacancyId);

      // --- TODO: Llamar API para obtener datos de la vacante con this.vacancyId ---
      // Simulación de carga de datos:
      const existingData = {
        title: 'Desarrollador Frontend Senior (Cargado)',
        department: 'Tecnología',
        location: 'Trabajo Remoto',
        pipelineTemplateId: 'pipe-ti',
        description: 'Descripción cargada de la base de datos...',
        requirements: ['Angular', 'TypeScript', 'Pruebas Unitarias']
      };

      // Rellena el formulario con los datos cargados
      this.vacancyForm.patchValue({
        title: existingData.title,
        department: existingData.department,
        location: existingData.location,
        pipelineTemplateId: existingData.pipelineTemplateId,
        description: existingData.description
      });
      // Rellena los requisitos (chips)
      this.requirements = existingData.requirements;

    } else {
      // --- MODO CREACIÓN ---
      this.isEditMode = false;
      this.pageTitle = 'Crear Nueva Vacante';
      console.log('Modo Creación');
      // Inicializamos requisitos (ya estaba hecho)
      this.requirements = ['Angular', 'TypeScript']; // O dejar vacío: []
    }
  }

  // --- Lógica para MatChips de Requisitos ---
  addRequirement(event: any): void { // 'any' para MatChipInputEvent
    const value = (event.value || '').trim();
    if (value) {
      this.requirements.push(value);
    }
    event.chipInput!.clear(); // Limpia el input
  }
  removeRequirement(req: string): void {
    const index = this.requirements.indexOf(req);
    if (index >= 0) {
      this.requirements.splice(index, 1);
    }
  }
  // --- Fin Lógica MatChips ---

  onSave(publish: boolean = false): void {
    if (this.vacancyForm.invalid) {
      this.vacancyForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formData = this.vacancyForm.value;

    // Combinar datos del formulario + requisitos
    const finalVacancyData = {
      ...formData,
      requirements: this.requirements, // Añade el array de requisitos
      status: publish ? 'abierta' : 'borrador' // Define el estado
    }
    if (this.isEditMode) {
      // --- LÓGICA DE ACTUALIZACIÓN ---
      console.log('Actualizando Vacante:', this.vacancyId, finalVacancyData);
      // --- TODO: Llamar API para ACTUALIZAR (UPDATE) la vacante ---
      // this.vacancyService.update(this.vacancyId, finalVacancyData).subscribe(...)

    } else {
      // --- LÓGICA DE CREACIÓN ---
      console.log('Guardando Vacante Nueva:', finalVacancyData);
      // --- TODO: Llamar API para CREAR (CREATE) la vacante ---
      // this.vacancyService.create(finalVacancyData).subscribe(...)
    }

    console.log('Guardando Vacante:', finalVacancyData);

    // --- TODO: Llamar API para guardar la vacante ---
    // this.vacancyService.create(finalVacancyData).subscribe(newVacancy => {
    //   this.isSubmitting = false;
    //   console.log('Vacante creada con ID:', newVacancy.id);
    //   // Redirigir a la lista de reclutamiento
    //   this.router.navigate(['/dashboard/recruitment']);
    // });

    // --- Simulación ---
    setTimeout(() => {
      this.isSubmitting = false;
      console.log('Vacante creada (simulación)');
      this.router.navigate(['/dashboard/recruitment']); // Volver a la lista
    }, 1500);
  }
}