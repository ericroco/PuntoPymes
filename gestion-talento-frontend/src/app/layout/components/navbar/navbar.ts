import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService, User } from '../../../modules/auth/services/auth';

// 👇 Material Modules (AGREGADOS PARA EL MENÚ Y EL SELECT)
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';     // <--- NUEVO
import { MatButtonModule } from '@angular/material/button'; // <--- NUEVO
import { MatIconModule } from '@angular/material/icon';     // <--- NUEVO

// 👇 Servicios, Constantes e Interfaces
import { BranchesService, Branch } from '../../../modules/organization/services/branches';
import { ContextService } from '../../../modules/dashboard/services/context';
import { PERMISSIONS } from '../../../shared/constants/permissions';
// Importamos la interfaz que definimos antes
import { Notification } from '../../../shared/interfaces/notification.interface';
import { EmployeesService, Employee } from '../../../modules/dashboard/services/employees';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,   // <--- Agregar
    MatButtonModule, // <--- Agregar
    MatIconModule    // <--- Agregar
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar implements OnInit {
  private authService = inject(AuthService);
  private branchesService = inject(BranchesService);
  private contextService = inject(ContextService);
  private employeesService = inject(EmployeesService);

  currentUser: User | null = null;
  currentEmployee: Employee | null = null;

  // Variables para el Selector de Sucursales
  branches: Branch[] = [];
  selectedBranchId: string | null = null;
  canSwitchBranch = false;

  // --- 🔔 LOGICA DE NOTIFICACIONES (NUEVO) ---
  notificationCount = 0;

  // Datos simulados (luego vendrán del backend)
  notifications: Notification[] = [
    {
      id: '1',
      type: 'ANUNCIO',
      title: 'Mañana cierre temprano por fumigación',
      time: 'Hace 30 min',
      icon: 'campaign',
      color: 'warn',
      read: false
    },
    {
      id: '2',
      type: 'ENCUESTA',
      title: 'Nueva encuesta de clima laboral',
      time: 'Hace 2 horas',
      icon: 'poll',
      color: 'primary',
      read: false
    },
    {
      id: '3',
      type: 'SISTEMA',
      title: 'Bienvenido a PuntoPymes',
      time: 'Ayer',
      icon: 'info',
      color: 'accent', // Gris/Azul
      read: true
    }
  ];

  ngOnInit(): void {
    // 1. Obtenemos el usuario básico del token (Auth)
    this.currentUser = this.authService.getUser();

    // 2. 👇 CARGAR DATOS REALES DEL EMPLEADO
    // Usamos el ID del usuario para buscar su ficha de empleado
    if (this.currentUser && this.currentUser.id) {
      this.employeesService.getEmployeeById(this.currentUser.id).subscribe({
        next: (emp) => {
          this.currentEmployee = emp;
          // Opcional: Si el empleado tiene una foto más reciente que el token, se actualizará sola
        },
        error: (err) => console.warn('No se pudo cargar perfil de empleado', err)
      });
    }

    this.updateNotificationCount();
    this.selectedBranchId = this.contextService.getBranch();

    if (this.authService.hasPermission(PERMISSIONS.BRANCHES_MANAGE)) {
      this.canSwitchBranch = true;
      this.loadBranches();
    }
  }

  // --- LÓGICA DE NOTIFICACIONES ---

  updateNotificationCount() {
    this.notificationCount = this.notifications.filter(n => !n.read).length;
  }

  markAllRead() {
    // Marcamos todas como leídas localmente
    this.notifications.forEach(n => n.read = true);
    this.updateNotificationCount();

    // Aquí podrías llamar al backend: this.notificationService.markAllAsRead().subscribe(...)
  }

  // --- LÓGICA DE SUCURSALES (EXISTENTE) ---

  loadBranches() {
    this.branchesService.getBranches().subscribe({
      next: (data) => {
        this.branches = data.filter(b => b.activa);
      },
      error: (err) => console.error('Error cargando sucursales para el header', err)
    });
  }

  onBranchChange(branchId: string | null) {
    if (!branchId) {
      this.contextService.setBranch(null);
    } else {
      const selectedBranch = this.branches.find(b => b.id === branchId);
      if (selectedBranch) {
        this.contextService.setBranch({
          id: selectedBranch.id,
          nombre: selectedBranch.nombre
        });
      } else {
        this.contextService.setBranch(branchId);
      }
    }
    window.location.reload();
  }

  // --- HELPERS ACTUALIZADOS ---

  get displayName(): string {
    // 1. Prioridad: Datos del Empleado (RRHH)
    if (this.currentEmployee) {
      return `${this.currentEmployee.nombre} ${this.currentEmployee.apellido}`;
    }

    // 2. Fallback: Datos del Token (Auth) - Aquí ya no intentamos acceder a .nombre si no existe
    if (this.currentUser) {
      // Si tu interfaz User tiene 'email', usamos eso.
      // Si por casualidad tu token SÍ traía nombre pero TypeScript se quejaba, podrías hacer (this.currentUser as any).nombre
      return this.currentUser.email?.split('@')[0] || 'Usuario';
    }

    return 'Invitado';
  }

  get userRole(): string {
    // Puedes sacar el rol del empleado (cargo) o del usuario (sistema)
    if (this.currentEmployee?.cargo?.nombre) {
      return this.currentEmployee.cargo.nombre; // Ej: "Desarrollador Senior"
    }

    const roleMap: any = {
      'admin': 'Administrador del Sistema',
      'gerente': 'Gerente',
      'empleado': 'Colaborador'
    };
    return roleMap[this.currentUser?.role || ''] || this.currentUser?.role || 'Usuario';
  }

  get userAvatar(): string {
    // Priorizamos la foto del empleado, luego la del usuario, luego default
    return this.currentEmployee?.fotoUrl ||
      this.currentUser?.fotoUrl ||
      'assets/images/default-avatar.png';
  }
} 