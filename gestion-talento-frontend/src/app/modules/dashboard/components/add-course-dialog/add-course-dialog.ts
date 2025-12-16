import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Material Modules
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

// 👇 IMPORTANTE: Usamos la interfaz compartida (Ajusta la ruta si es necesario)
import { Course } from '../../models/course.models';

@Component({
  selector: 'app-add-course-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule
  ],
  templateUrl: './add-course-dialog.html', // Asegúrate que el nombre coincida
  styleUrls: ['./add-course-dialog.scss']
})
export class AddCourseDialogComponent implements OnInit { // Nombre estándar Angular
  courseForm: FormGroup;
  isEditMode: boolean;

  // Lista de categorías disponibles
  categories: string[] = [
    'Tecnología',
    'Liderazgo',
    'Idiomas',
    'Ventas',
    'Recursos Humanos',
    'Seguridad y Salud'
  ];

  constructor(
    public dialogRef: MatDialogRef<AddCourseDialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { course: Course | null }
  ) {
    this.isEditMode = !!data.course;

    // Inicialización del formulario
    this.courseForm = this.fb.group({
      // Validamos que tenga título y mínimo 3 caracteres
      title: [data.course?.title || '', [Validators.required, Validators.minLength(3)]],

      instructor: [data.course?.instructor || '', Validators.required],

      category: [data.course?.category || null, Validators.required],

      duration: [data.course?.duration || '', Validators.required],

      // Validamos que sea requerido (y opcionalmente podrías poner Validators.pattern para URL)
      imageUrl: [data.course?.imageUrl || '', Validators.required],

      // Descripción obligatoria y con algo de contenido
      description: [data.course?.description || '', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void { }

  onCancel(): void {
    this.dialogRef.close(null); // Cerramos sin devolver datos
  }

  onSave(): void {
    if (this.courseForm.valid) {
      // Devolvemos los datos del formulario al componente padre (CourseCatalog)
      this.dialogRef.close(this.courseForm.value);
    } else {
      // Si el usuario intenta guardar con errores, marcamos los campos en rojo
      this.courseForm.markAllAsTouched();
    }
  }
}