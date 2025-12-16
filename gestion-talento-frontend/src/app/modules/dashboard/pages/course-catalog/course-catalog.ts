import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // Importar HttpClient

// Material Modules
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

// Gráficos
import { NgxChartsModule, Color, ScaleType } from '@swimlane/ngx-charts';

// Componentes y Servicios
import { SubpageHeader } from '../../../../shared/components/subpage-header/subpage-header';
import { PERMISSIONS } from '../../../../shared/constants/permissions';
import { AuthService } from '../../../auth/services/auth';
import { environment } from '../../../../../environments/environment'; // Asegúrate de tener esto
import { CourseService } from '../../services/course';
import { Course, CreateCourseDto, UpdateCourseDto } from '../../models/course.models';
import { AddCourseDialogComponent } from '../../components/add-course-dialog/add-course-dialog';

// Animaciones
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';



export interface CareerStep {
  name: string;
  status: 'completado' | 'actual' | 'pendiente';
  competencies: string[];
  recommendedCourses: Partial<Course>[];
}

@Component({
  selector: 'app-course-catalog',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterModule,
    MatTabsModule, MatCardModule, MatButtonModule, MatIconModule,
    MatProgressBarModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatStepperModule, MatTooltipModule,
    MatTableModule, MatMenuModule, MatDialogModule, MatSnackBarModule,
    MatButtonToggleModule,
    NgxChartsModule,
    SubpageHeader, AddCourseDialogComponent
  ],
  templateUrl: './course-catalog.html', // Asegúrate de que el nombre coincida
  styleUrls: ['./course-catalog.scss'],
  animations: [
    trigger('cardAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ], { optional: true })
      ])
    ]),
    trigger('listAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('500ms ease-in', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class CourseCatalog implements OnInit {
  // Inyecciones
  private router = inject(Router);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private courseService = inject(CourseService);

  // --- ESTADO Y PERMISOS ---
  canManageTraining: boolean = false; // Permiso maestro para ver Admin
  viewMode: 'student' | 'admin' = 'student'; // Controla qué vista se muestra en el HTML

  // --- DATOS ---
  myEnrolledCourses: Course[] = [];
  catalogCourses: Course[] = []; // Todos los cursos (maestra)
  filteredCatalogCourses: Course[] = []; // Cursos filtrados en vista
  myCareerPlan: CareerStep[] = [];

  // Filtros
  searchTerm: string = '';
  selectedCategory: string = 'todos';
  categories: string[] = ['Tecnología', 'Liderazgo', 'Idiomas', 'Ventas', 'Recursos Humanos'];

  // --- DATOS ADMIN (TABLA) ---
  displayedColumns: string[] = ['title', 'category', 'instructor', 'duration', 'actions'];

  // --- GRÁFICOS (MOCK - Estos suelen calcularse en backend) ---
  chartColorScheme: Color = {
    name: 'custom',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#3f51b5', '#ff4081', '#4caf50', '#ff9800', '#9c27b0']
  };

  courseCompletionData = [
    { name: 'Seguridad Industrial', value: 120 },
    { name: 'Excel Avanzado', value: 95 },
    { name: 'Liderazgo Ágil', value: 80 }
  ];

  enrollmentTrendData = [
    {
      name: 'Inscripciones',
      series: [
        { name: 'Ene', value: 10 },
        { name: 'Feb', value: 25 },
        { name: 'Mar', value: 45 }
      ]
    }
  ];

  ngOnInit(): void {
    this.checkPermissions();
    this.loadRealData();

    // Si queremos cargar el Plan de Carrera Mock por ahora (hasta tener endpoint)
    this.loadMockCareerPlan();
  }

  // --- LÓGICA DE PERMISOS ---
  checkPermissions() {
    // 1. Verificar si tiene permiso de Admin LMS
    this.canManageTraining = this.authService.hasPermission(PERMISSIONS.TRAINING_MANAGE);

    // 2. Lógica opcional: Si es Admin, ¿quieres que entre directo a la vista Admin?
    // Si no, por defecto entra como 'student' y él cambia con el switch.
    if (this.canManageTraining) {
      // this.viewMode = 'admin'; // Descomenta si prefieres default admin
    }

    console.log('¿Es Gestor LMS?', this.canManageTraining);
  }

  onViewModeChange() {
    console.log('Vista cambiada a:', this.viewMode);
    // Podrías recargar datos específicos si cambias de vista
    if (this.viewMode === 'admin') {
      // Cargar datos extra de reportes si es necesario
    }
  }

  // --- CARGA DE DATOS REALES ---
  loadCoursesFromBackend() {
    // Asumiendo que tienes un endpoint GET /courses
    // Si no tienes el endpoint listo, usa loadMockData() temporalmente

    this.http.get<Course[]>(`${environment.apiUrl}/courses`).subscribe({
      next: (courses) => {
        console.log('Cursos cargados:', courses);

        // Separar en "Mis Cursos" y "Catálogo"
        // Esto asume que el backend devuelve un flag 'isEnrolled' para el usuario actual
        this.myEnrolledCourses = courses.filter(c => c.isEnrolled);
        this.catalogCourses = courses.filter(c => !c.isEnrolled);

        this.applyFilters(); // Actualizar vista
      },
      error: (err) => {
        console.warn('No se pudieron cargar cursos reales, usando MOCK:', err);

      }
    });
  }

  // 1. Función para cargar el catálogo base
  loadRealData() {
    const empleadoId = this.authService.getCurrentUserId();

    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.catalogCourses = data;
        this.filteredCatalogCourses = data;

        // 👇 AQUÍ ESTÁ EL CAMBIO: No escribas la lógica de nuevo.
        // Simplemente llama a la función que ya arreglaste abajo.
        this.loadMyEnrollments(empleadoId);
      },
      error: (err) => console.error('Error cargando catálogo', err)
    });
  }

  // 2. Función arreglada para cargar inscripciones (Con isActive)
  loadMyEnrollments(empleadoId: string) {
    this.courseService.getMyEnrollments(empleadoId).subscribe({
      next: (inscripciones) => {
        console.log('Mis Cursos recibidos:', inscripciones);

        this.myEnrolledCourses = inscripciones.map((inscripcion: any) => ({
          // Datos del curso
          id: inscripcion.curso.id,
          title: inscripcion.curso.title,
          description: inscripcion.curso.description,
          instructor: inscripcion.curso.instructor,
          duration: inscripcion.curso.duration,
          category: inscripcion.curso.category,
          imageUrl: inscripcion.curso.imageUrl || 'assets/images/default-course.jpg',

          // ✅ CORRECCIÓN CRÍTICA: Aquí sí incluimos isActive
          isActive: inscripcion.curso.isActive ?? true,

          // Datos calculados
          createdAt: inscripcion.curso.createdAt ? new Date(inscripcion.curso.createdAt) : undefined,
          progress: inscripcion.progreso || 0,
          isEnrolled: true,

          // ⚠️ OJO: Si 'enrollmentId' te da error, bórralo o agrégalo a tu interface Course como opcional
          enrollmentId: inscripcion.id
        }));

        // Filtramos el catálogo para quitar los que ya tengo
        const misIds = this.myEnrolledCourses.map(c => c.id);

        // Aseguramos que comparamos strings con strings
        this.catalogCourses = this.catalogCourses.filter(c => !misIds.includes(c.id));

        this.applyFilters();
      },
      error: (err) => console.error('Error cargando mis cursos', err)
    });
  }

  enrollCourse(course: Course) {
    const empleadoId = this.authService.getCurrentUserId();

    this.courseService.enrollEmployee(course.id as string, empleadoId).subscribe({
      next: (newEnrollment) => {
        // Actualizar UI Localmente
        course.isEnrolled = true;
        course.progress = 0;
        this.myEnrolledCourses.push(course);
        this.catalogCourses = this.catalogCourses.filter(c => c.id !== course.id);
        this.applyFilters();

        this.snackBar.open('Inscripción exitosa', 'Cerrar', { duration: 3000 });
      },
      error: (err) => this.snackBar.open('Error al inscribir', 'Cerrar')
    });
  }


  loadMockCareerPlan() {
    this.myCareerPlan = [
      {
        name: 'Nivel 1: Integración',
        status: 'completado',
        competencies: ['Conocimiento de la empresa', 'Seguridad básica'],
        recommendedCourses: []
      },
      {
        name: 'Nivel 2: Desarrollo Técnico',
        status: 'actual',
        competencies: ['Dominio de herramientas', 'Gestión de proyectos básica'],
        recommendedCourses: [
          { title: 'Excel para Finanzas', instructor: 'Ana Gómez', imageUrl: 'assets/images/course6.jpg' }
        ]
      }
    ];
  }

  // --- LÓGICA DE EMPLEADO ---

  applyFilters() {
    let tempCourses = this.catalogCourses;

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      tempCourses = tempCourses.filter(c =>
        c.title.toLowerCase().includes(term) ||
        c.instructor.toLowerCase().includes(term)
      );
    }

    if (this.selectedCategory !== 'todos') {
      tempCourses = tempCourses.filter(c => c.category === this.selectedCategory);
    }

    this.filteredCatalogCourses = tempCourses;
  }


  continueCourse(course: Course) {
    console.log('Navegando al reproductor del curso:', course.id);
    this.snackBar.open('Abriendo reproductor de curso...', 'Ok', { duration: 2000 });
  }

  // ==========================================
  //        LÓGICA DE ADMIN (MODALES)
  // ==========================================

  openCourseDialog(course?: Course) {
    const isEditing = !!course;

    // 1. Abrir el Diálogo
    const dialogRef = this.dialog.open(AddCourseDialogComponent, {
      width: '600px',
      disableClose: true, // El usuario debe dar clic en Cancelar o Guardar
      data: {
        course: course || null
      }
    });

    // 2. Esperar respuesta cuando se cierra
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // 'result' son los datos del formulario (title, description, etc.)
        if (isEditing && course) {
          this.handleUpdateCourse(course.id as string, result);
        } else {
          this.handleCreateCourse(result);
        }
      }
    });
  }

  // --- Lógica Privada para CREAR ---
  // En course-catalog.ts

  private handleCreateCourse(formData: any) {
    console.log('📦 Datos del Formulario (Angular):', formData);

    // 1. MAPEO MANUAL (Traducción Crítica)
    // Izquierda: Lo que pide el Backend (DTO)
    // Derecha: Lo que viene del Formulario
    const dto = {
      titulo: formData.title,             // 👈 Backend 'titulo' = Form 'title'
      descripcion: formData.description,  // 👈 Backend 'descripcion' = Form 'description'

      // Estos deben coincidir exactamente
      duration: formData.duration,
      instructor: formData.instructor,
      category: formData.category,
      imageUrl: formData.imageUrl,

      // Opcional: forzar activo si no viene
      isActive: true
    };

    console.log('🚀 Enviando al Backend:', dto); // ¡MIRA ESTO EN LA CONSOLA!

    // 2. Enviar
    this.courseService.createCourse(dto as any).subscribe({
      next: (newCourse) => {
        // ... (Tu lógica de éxito) ...
        this.snackBar.open('Curso creado exitosamente', 'Cerrar', { duration: 3000 });

        // Recargar datos reales para ver el nuevo curso en la tabla
        this.loadCoursesFromBackend();
      },
      error: (err) => {
        console.error('❌ Error Backend:', err);
        // Esto te dirá EXACTAMENTE qué campo falta
        if (err.error && Array.isArray(err.error.message)) {
          alert('Faltan datos: ' + err.error.message.join(', '));
        } else {
          this.snackBar.open('Error al crear el curso (400). Revisa consola.', 'Cerrar');
        }
      }
    });
  }

  // --- Lógica Privada para EDITAR ---
  private handleUpdateCourse(courseId: string, formData: any) {
    const dto: UpdateCourseDto = {
      titulo: formData.title,
      descripcion: formData.description,
      instructor: formData.instructor,
      category: formData.category,
      duration: formData.duration,
      imageUrl: formData.imageUrl
    };

    this.courseService.updateCourse(courseId, dto).subscribe({
      next: (updatedCourse) => {
        // Actualizar el item específico en el array local
        const index = this.catalogCourses.findIndex(c => c.id === courseId);
        if (index !== -1) {
          // Fusionamos los datos nuevos sobre los viejos
          this.catalogCourses[index] = {
            ...this.catalogCourses[index],
            title: updatedCourse.title,
            description: updatedCourse.description,
            instructor: updatedCourse.instructor,
            category: updatedCourse.category,
            duration: updatedCourse.duration,
            imageUrl: updatedCourse.imageUrl || this.catalogCourses[index].imageUrl
          };

          this.catalogCourses = [...this.catalogCourses]; // Refrescar tabla
          this.applyFilters();
        }
        this.snackBar.open('Curso actualizado correctamente', 'Cerrar', { duration: 3000 });
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('Error al actualizar el curso.', 'Cerrar');
      }
    });
  }

  // --- Lógica para ELIMINAR ---
  deleteCourse(course: Course) {
    if (confirm(`¿Estás seguro de eliminar el curso "${course.title}"?`)) {
      this.courseService.deleteCourse(course.id as string).subscribe({
        next: () => {
          // Quitar del array visualmente
          this.catalogCourses = this.catalogCourses.filter(c => c.id !== course.id);
          this.applyFilters();
          this.snackBar.open('Curso eliminado', 'Cerrar', { duration: 3000 });
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('Error al eliminar. Puede tener alumnos inscritos.', 'Cerrar');
        }
      });
    }
  }
}