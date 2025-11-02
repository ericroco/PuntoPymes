import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
// NGX Charts
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';
// --- CORRECCIÓN 1: Importar funciones de Animación ---
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
// Componentes
// --- CORRECCIÓN 2: Importar los nombres de CLASE correctos ---
import { SubpageHeader } from '../../../../shared/components/subpage-header/subpage-header';
import { CareerPaths } from '../career-paths/career-paths'; // Asumiendo que la clase es CareerPathsComponent
// Modales
import { AddCourseDialog } from '../../components/add-course-dialog/add-course-dialog';
import { ConfirmationDialog } from '../../../../shared/components/confirmation-dialog/confirmation-dialog';

// Interface para Curso
interface Course {
  id: number;
  title: string;
  category: string;
  instructor: string;
  duration: string;
  imageUrl: string;
  description?: string;
  progress?: number;
}
// Interface para Plan de Carrera
interface CareerPlanStep {
  name: string;
  status: 'completado' | 'actual' | 'siguiente';
  competencies: string[];
  recommendedCourses: Course[];
}

@Component({
  selector: 'app-course-catalog',
  standalone: true,
  imports: [
    CommonModule, RouterModule, FormsModule, ReactiveFormsModule,
    MatCardModule, MatButtonModule, MatProgressBarModule, MatIconModule,
    MatTabsModule, MatFormFieldModule, MatInputModule, MatSelectModule,
    MatTableModule, MatMenuModule, MatDialogModule, MatDividerModule,
    NgxChartsModule,
    MatStepperModule,
    // --- CORRECCIÓN 3: Usar los nombres de CLASE correctos en imports ---
    SubpageHeader,
    CareerPaths
  ],
  templateUrl: './course-catalog.html',
  styleUrls: ['./course-catalog.scss'],
  // --- CORRECCIÓN 4: Añadir AMBAS animaciones ---
  animations: [
    trigger('cardAnimation', [ // Animación para las tarjetas de curso
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(15px)' }),
          stagger('100ms',
            animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          )
        ], { optional: true })
      ])
    ]),
    trigger('listAnimation', [ // Animación para listas o widgets (Admin)
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'scale(0.9)' }),
          stagger('100ms', [
            animate('400ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
          ])
        ], { optional: true })
      ])
    ])
  ]
  // --- FIN CORRECCIÓN 4 ---
})
export class CourseCatalog implements OnInit { // Nombre de clase corregido

  // --- Simulación de Rol ---
  viewingAsAdmin: boolean = false;

  // --- Datos Pestaña Empleado ---
  myEnrolledCourses: Course[] = [];
  catalogCourses: Course[] = [];
  filteredCatalogCourses: Course[] = [];
  searchTerm: string = '';
  selectedCategory: string = 'todos';
  categories: string[] = ['Tecnología', 'Diseño', 'Contabilidad', 'Marketing', 'Habilidades Blandas'];
  myCareerPlan: CareerPlanStep[] = [];

  // --- Datos Admin: Pestaña Reportes ---
  courseCompletionData = [
    { name: 'Angular Avanzado', value: 8 },
    { name: 'Diseño UX/UI', value: 12 },
    { name: 'Fundamentos de SEO', value: 5 }
  ];
  enrollmentTrendData = [
    {
      name: 'Inscripciones',
      series: [
        { name: 'Julio', value: 15 },
        { name: 'Agosto', value: 22 },
        { name: 'Septiembre', value: 18 },
        { name: 'Octubre', value: 35 }
      ]
    }
  ];
  chartColorScheme: Color = {
    name: 'puntopymesLMS',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: [
      'var(--color-primary)',
      'var(--color-accent)',
      'var(--color-warning)',
      'var(--color-success)'
    ]
  };

  // --- Datos Admin: Pestaña Gestión de Cursos ---
  displayedColumns: string[] = ['title', 'category', 'instructor', 'duration', 'actions'];

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    if (this.viewingAsAdmin) {
      console.log("Cargando datos (Admin): Gestión de Cursos...");
      this.loadAdminData();
    } else {
      console.log("Cargando datos (Empleado): Mi Aprendizaje y Catálogo...");
      this.loadEmployeeData();
    }
  }

  loadEmployeeData(): void {
    // --- Simulación de API Call ---
    this.myEnrolledCourses = [
      { id: 1, title: 'Angular Avanzado: NgRx y Patrones', category: 'Tecnología', instructor: 'Erick Rodas', duration: '8h', imageUrl: 'https://picsum.photos/id/1/300/200', progress: 60, description: '...' },
      { id: 2, title: 'Introducción al Diseño UX/UI', category: 'Diseño', instructor: 'Valentina Samaniego', duration: '6h', imageUrl: 'https://picsum.photos/id/10/300/200', progress: 25, description: '...' }
    ];
    this.catalogCourses = [
      { id: 1, title: 'Angular Avanzado: NgRx y Patrones', category: 'Tecnología', instructor: 'Erick Rodas', duration: '8h', imageUrl: 'https://picsum.photos/id/1/300/200', description: '...' },
      { id: 2, title: 'Introducción al Diseño UX/UI', category: 'Diseño', instructor: 'Valentina Samaniego', duration: '6h', imageUrl: 'https://picsum.photos/id/10/300/200', description: '...' },
      { id: 3, title: 'Contabilidad para No Contadores', category: 'Contabilidad', instructor: 'Gabriela Loyola', duration: '4h', imageUrl: 'https://picsum.photos/id/20/300/200', description: '...' },
      { id: 4, title: 'Fundamentos de SEO y SEM', category: 'Marketing', instructor: 'Admin', duration: '5h', imageUrl: 'https://picsum.photos/id/30/300/200', description: '...' },
      { id: 5, title: 'Comunicación Efectiva', category: 'Habilidades Blandas', instructor: 'RRHH', duration: '3h', imageUrl: 'https://picsum.photos/id/40/300/200', description: '...' }
    ];
    this.applyFilters();
    this.myCareerPlan = [
      { name: 'Desarrollador Junior', status: 'completado', competencies: ['HTML/CSS Básico', 'JavaScript Básico'], recommendedCourses: [] },
      { name: 'Desarrollador Semi-Senior', status: 'actual', competencies: ['Angular Intermedio', 'Pruebas Unitarias', 'Git Flow'], recommendedCourses: [this.catalogCourses[0], this.catalogCourses[4]] },
      { name: 'Desarrollador Senior', status: 'siguiente', competencies: ['Arquitectura de Software', 'NgRx Avanzado', 'Liderazgo Técnico'], recommendedCourses: [] }
    ];
  }

  loadAdminData(): void {
    // Carga los cursos para la Pestaña 1 (Gestión)
    this.catalogCourses = [
      { id: 1, title: 'Angular Avanzado: NgRx y Patrones', category: 'Tecnología', instructor: 'Erick Rodas', duration: '8h', imageUrl: '...', description: '...' },
      { id: 2, title: 'Introducción al Diseño UX/UI', category: 'Diseño', instructor: 'Valentina Samaniego', duration: '6h', imageUrl: '...', description: '...' },
      { id: 3, title: 'Contabilidad para No Contadores', category: 'Contabilidad', instructor: 'Gabriela Loyola', duration: '4h', imageUrl: '...', description: '...' }
    ];
    // Datos para Pestaña 3 (Reportes)
    this.courseCompletionData = [
      { name: 'Angular Avanzado', value: 8 },
      { name: 'Diseño UX/UI', value: 12 },
    ];
    this.enrollmentTrendData = [
      { name: 'Inscripciones', series: [{ name: 'Ago', value: 22 }, { name: 'Sep', value: 18 }] }
    ];
  }

  applyFilters(): void {
    let tempCourses = [...this.catalogCourses];
    const lowerSearch = this.searchTerm.toLowerCase();
    if (this.searchTerm) {
      tempCourses = tempCourses.filter(course =>
        course.title.toLowerCase().includes(lowerSearch) ||
        course.instructor.toLowerCase().includes(lowerSearch)
      );
    }
    if (this.selectedCategory !== 'todos') {
      tempCourses = tempCourses.filter(course => course.category === this.selectedCategory);
    }
    this.filteredCatalogCourses = tempCourses;
  }

  // --- Funciones de Empleado (Placeholders) ---
  enrollCourse(course: Course): void {
    console.log(`Inscribiendo en curso: ${course.title}`);
    // --- TODO: Llamar API para inscribir ---
    // Simulación:
    alert(`Te has inscrito en "${course.title}". Aparecerá en "Mi Aprendizaje".`);
  }

  continueCourse(course: Course): void {
    console.log(`Continuando curso: ${course.title}`);
    // --- TODO: Navegar al visor del curso ---
  } openCourseDialog(course?: Course): void {
    const isEditMode = !!course;

    const dialogRef = this.dialog.open(AddCourseDialog, {
      width: '700px',
      disableClose: true,
      data: {
        course: course ? { ...course } : null // Pasa una copia (editar) o null (crear)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // result = { title: '...', ... }
      if (result) {
        if (isEditMode && course) {
          // --- Lógica de Edición ---
          console.log('Actualizando curso:', result);
          // --- TODO: Llamar API para ACTUALIZAR curso ---
          // Simulación local:
          const index = this.catalogCourses.findIndex(c => c.id === course.id);
          if (index > -1) {
            this.catalogCourses[index] = { ...course, ...result }; // Actualiza
            this.catalogCourses = [...this.catalogCourses]; // Forzar actualización de tabla
          }
        } else {
          // --- Lógica de Creación ---
          console.log('Creando curso:', result);
          // --- TODO: Llamar API para CREAR curso ---
          // Simulación local:
          const newCourse: Course = {
            id: Date.now(), // ID Temporal
            ...result
          };
          this.catalogCourses = [newCourse, ...this.catalogCourses]; // Añade al inicio
        }
      }
    });
  }

  deleteCourse(course: Course): void {
    // 1. Abrir modal de confirmación
    const dialogRef = this.dialog.open(ConfirmationDialog, {
      width: '400px',
      data: {
        title: 'Confirmar Eliminación',
        message: `¿Estás seguro de que deseas eliminar el curso "${course.title}"? Esta acción no se puede deshacer.`
      }
    });

    // 2. Esperar resultado
    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        console.log('Eliminando curso:', course.title);
        // --- TODO: Llamar API para ELIMINAR curso ---
        // Simulación local:
        this.catalogCourses = this.catalogCourses.filter(c => c.id !== course.id);
      }
    });
  }
}