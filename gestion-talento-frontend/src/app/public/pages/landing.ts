import { Component, ElementRef, ViewChildren, QueryList, AfterViewInit, Inject, PLATFORM_ID, HostListener } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { trigger, style, animate, transition, state } from '@angular/animations';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './landing.html',
  styleUrls: ['./landing.scss'],
  animations: [
    // Animación de aparición suave
    trigger('fadeUp', [
      state('hidden', style({ opacity: 0, transform: 'translateY(30px)' })),
      state('visible', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('hidden => visible', [
        animate('0.6s cubic-bezier(0.25, 0.8, 0.25, 1)')
      ])
    ])
  ]
})
export class LandingComponent implements AfterViewInit {
  // Referencias para animación (si decides agregar #animTarget en el HTML)
  @ViewChildren('animTarget') animTargets!: QueryList<ElementRef>;

  // Estado de la UI
  mobileMenuOpen = false;
  isScrolled = false;
  isBrowser: boolean;

  // ==========================================
  // DATOS (Mock Data para el HTML)
  // ==========================================

  features = [
    {
      icon: 'groups',
      color: 'blue',
      title: 'Gestión de Personal',
      desc: 'Centraliza expedientes, contratos y documentos en un entorno seguro.'
    },
    {
      icon: 'psychology',
      color: 'green',
      title: 'Evaluación con IA',
      desc: 'Analiza el desempeño y clima laboral con inteligencia artificial.'
    },
    {
      icon: 'payments',
      color: 'orange',
      title: 'Nómina Automatizada',
      desc: 'Cálculos precisos de roles, horas extra y beneficios de ley.'
    },
    {
      icon: 'school',
      color: 'purple',
      title: 'Capacitación (LMS)',
      desc: 'Impulsa el crecimiento de tu equipo con cursos internos.'
    }
  ];

  benefits = [
    {
      icon: 'schedule',
      title: 'Ahorra 80% de Tiempo',
      description: 'Automatiza tareas repetitivas y enfócate en la estrategia de talento.'
    },
    {
      icon: 'gavel',
      title: 'Cumplimiento Legal',
      description: 'Mantente al día con las normativas laborales automáticamente.'
    },
    {
      icon: 'insights',
      title: 'Decisiones Basadas en Datos',
      description: 'Dashboards en tiempo real para tomar mejores decisiones.'
    },
    {
      icon: 'cloud_done',
      title: 'Acceso Remoto Seguro',
      description: 'Gestiona tu empresa desde cualquier lugar con seguridad bancaria.'
    }
  ];

  testimonials = [
    {
      quote: "PuntoPyMES transformó cómo gestionamos nuestro equipo remoto. La nómina ahora toma minutos.",
      author: "María González",
      role: "CEO TechSolutions"
    },
    {
      quote: "La herramienta de reclutamiento con IA nos ayudó a encontrar talento increíble en tiempo récord.",
      author: "Carlos Durán",
      role: "Gerente RRHH Global"
    },
    {
      quote: "El soporte es increíble y la plataforma es muy intuitiva. Perfecta para nuestra PyME.",
      author: "Ana Lucía R.",
      role: "Directora Operativa"
    }
  ];

  pricingPlans = [
    {
      name: 'Emprendedor',
      price: '0',
      description: 'Para empresas que están empezando.',
      features: ['Hasta 5 empleados', 'Gestión documental básica', 'Soporte por email'],
      cta: 'Comenzar Gratis',
      featured: false
    },
    {
      name: 'Crecimiento',
      price: '29',
      description: 'Para PyMES en expansión.',
      features: ['Hasta 25 empleados', 'Nómina automática', 'Evaluaciones de desempeño', 'Soporte prioritario'],
      cta: 'Prueba Gratis',
      featured: true
    },
    {
      name: 'Corporativo',
      price: '99',
      description: 'Gestión total sin límites.',
      features: ['Empleados ilimitados', 'Módulo de IA avanzado', 'API Access', 'Gerente de cuenta'],
      cta: 'Contactar Ventas',
      featured: false
    }
  ];

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngAfterViewInit() {
    if (this.isBrowser) {
      this.setupIntersectionObserver();
    }
  }

  // ==========================================
  // LÓGICA DE INTERFAZ
  // ==========================================

  // Detectar Scroll para cambiar estilo del Navbar
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isBrowser) {
      // Si bajamos más de 50px, activamos el modo "scrolled"
      this.isScrolled = window.scrollY > 50;
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  openDemo() {
    // Aquí podrías abrir un modal o redirigir a un video
    console.log('Abriendo demo...');
    // Ejemplo: this.dialog.open(DemoModalComponent);
  }

  // ==========================================
  // ANIMACIONES
  // ==========================================

  private setupIntersectionObserver() {
    // Configuración para que las animaciones se disparen al ver el elemento
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    // Observar elementos si existen
    if (this.animTargets) {
      this.animTargets.forEach(el => {
        observer.observe(el.nativeElement);
      });
    }
  }
}