import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

// Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule, MatChipInputEvent } from '@angular/material/chips'; // Importar evento
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { COMMA, ENTER } from '@angular/cdk/keycodes'; // Teclas para chips

// Componentes y Servicios
import { SubpageHeader } from '../../../../shared/components/subpage-header/subpage-header';
import { RecruitmentService } from '../../services/recruitment';
import { CatalogService, Department } from '../../services/catalog';

@Component({
  selector: 'app-create-vacancy',
  standalone: true,
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatButtonModule, MatIconModule, MatCardModule, MatChipsModule,
    MatAutocompleteModule, SubpageHeader, MatProgressSpinnerModule, MatSnackBarModule
  ],
  templateUrl: './create-vacancy.html',
  styleUrls: ['./create-vacancy.scss']
})
export class CreateVacancy implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private recruitmentService = inject(RecruitmentService);
  private catalogService = inject(CatalogService);
  private snackBar = inject(MatSnackBar);

  // Estado del formulario
  vacancyForm: FormGroup;
  isSubmitting: boolean = false;
  isEditMode: boolean = false;
  private vacancyId: string | null = null;
  pageTitle: string = 'Crear Nueva Vacante';

  // Datos
  availableDepartments: Department[] = [];

  // RESTAURADO: Plantillas de Pipeline (Simuladas por ahora)
  pipelineTemplates = [
    { id: 'pipe-ti', name: 'Proceso de Selección TI (4 Fases)' },
    { id: 'pipe-mkt', name: 'Proceso de Marketing (3 Fases)' },
    { id: 'pipe-gen', name: 'Proceso General (2 Fases)' }
  ];

  // RESTAURADO: Lógica de Chips (Requisitos)
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  requirements: string[] = ['Trabajo en Equipo']; // Default
  requirementCtrl = new FormControl();

  constructor() {
    this.vacancyForm = this.fb.group({
      title: ['', Validators.required],
      department: [null, Validators.required], // Objeto departamento o ID
      location: ['Remoto', Validators.required],
      pipelineTemplateId: ['pipe-ti', Validators.required], // Default template
      description: ['', [Validators.required, Validators.minLength(20)]],
      salarioMin: [0],
      salarioMax: [0]
    });
  }

  ngOnInit(): void {
    // 1. Cargar Departamentos Reales
    this.catalogService.getDepartments().subscribe(data => this.availableDepartments = data);

    // 2. Verificar si es edición
    this.vacancyId = this.route.snapshot.paramMap.get('id');

    if (this.vacancyId) {
      this.isEditMode = true;
      this.pageTitle = 'Editar Vacante';
      this.loadVacancyData(this.vacancyId);
    }
  }

  loadVacancyData(id: string) {
    this.recruitmentService.getVacancyById(id).subscribe({
      next: (data) => {
        // Rellenar formulario
        this.vacancyForm.patchValue({
          title: data.titulo,
          // department: data.departamentoId, // Ajustar según lo que devuelva tu back
          location: data.ubicacion,
          description: data.descripcion,
          salarioMin: data.salarioMin,
          salarioMax: data.salarioMax
        });

        // Parsear requisitos
        if (data.requisitos) {
          this.requirements = data.requisitos.split(',').map(r => r.trim());
        }
      },
      error: (err) => console.error(err)
    });
  }

  // --- RESTAURADO: Lógica de Chips ---
  addRequirement(event: any): void { // MatChipInputEvent
    const value = (event.value || '').trim();
    if (value) {
      this.requirements.push(value);
    }
    // Limpiar input
    if (event.chipInput) {
      event.chipInput.clear();
    }
    this.requirementCtrl.setValue(null);
  }

  removeRequirement(req: string): void {
    const index = this.requirements.indexOf(req);
    if (index >= 0) {
      this.requirements.splice(index, 1);
    }
  }

  // --- Guardar ---
  onSave(publish: boolean = false): void {
    if (this.vacancyForm.invalid) {
      this.vacancyForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formVal = this.vacancyForm.value;

    // Construir DTO para el Backend
    const payload = {
      titulo: formVal.title,
      descripcion: formVal.description,
      ubicacion: formVal.location,
      salarioMin: formVal.salarioMin,
      salarioMax: formVal.salarioMax,
      // Unir los chips en un string separado por comas
      requisitos: this.requirements.join(', '),
      estado: publish ? 'PUBLICA' : 'BORRADOR',

      // Manejo seguro del ID de departamento
      departamentoId: typeof formVal.department === 'object' ? formVal.department?.id : formVal.department
    };

    if (this.isEditMode && this.vacancyId) {
      // Lógica Update (si la tienes implementada)
      console.log('Update no implementado en servicio frontend aún', payload);
      this.isSubmitting = false;
    } else {
      this.recruitmentService.createVacancy(payload).subscribe({
        next: (res) => {
          console.log('Vacante creada:', res);
          this.isSubmitting = false;
          this.snackBar.open(publish ? '¡Vacante publicada!' : 'Borrador guardado', 'Cerrar', { duration: 3000 });
          this.router.navigate(['/dashboard/recruitment']);
        },
        error: (err) => {
          console.error(err);
          this.isSubmitting = false;
          this.snackBar.open('Error al crear la vacante', 'Cerrar');
        }
      });
    }
  }
}