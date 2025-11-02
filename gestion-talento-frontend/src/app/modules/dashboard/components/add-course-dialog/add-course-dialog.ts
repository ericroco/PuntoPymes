import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Material
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

// Interface para un Curso (debe coincidir con la de course-catalog.ts)
interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  imageUrl: string;
  description?: string; // Hacemos la descripción opcional en la interfaz
}

@Component({
  selector: 'app-add-course-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule, MatButtonModule,
    MatFormFieldModule, MatInputModule, MatSelectModule, MatIconModule
  ],
  templateUrl: './add-course-dialog.html',
  styleUrls: ['./add-course-dialog.scss']
})
export class AddCourseDialog implements OnInit {
  courseForm: FormGroup;
  isEditMode: boolean;
  
  // Categorías de ejemplo (en una app real, vendrían de Configuración)
  categories: string[] = ['Tecnología', 'Diseño', 'Contabilidad', 'Marketing', 'Habilidades Blandas', 'Idiomas'];

  constructor(
    public dialogRef: MatDialogRef<AddCourseDialog>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: { course: Course | null }
  ) {
    this.isEditMode = !!data.course; // Si 'course' no es nulo, es modo edición
    
    // Inicializa el formulario
    this.courseForm = this.fb.group({
      title: [data.course?.title || '', Validators.required],
      instructor: [data.course?.instructor || '', Validators.required],
      category: [data.course?.category || null, Validators.required],
      duration: [data.course?.duration || '', Validators.required],
      imageUrl: [data.course?.imageUrl || '', Validators.required], // URL de la imagen de portada
      description: [data.course?.description || '', Validators.required]
    });
  }

  ngOnInit(): void {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.courseForm.valid) {
      // Devuelve los datos del formulario
      this.dialogRef.close(this.courseForm.value); 
    } else {
      this.courseForm.markAllAsTouched(); // Muestra errores
    }
  }
}