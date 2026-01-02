import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// 👇 Material Modules
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip'; // <--- AGREGADO

// 👇 Servicios e Interfaces
import { AuthService, User } from '../../../modules/auth/services/auth';
import { BranchesService, Branch } from '../../../modules/organization/services/branches';
import { ContextService } from '../../../modules/dashboard/services/context';
import { EmployeesService, Employee } from '../../../modules/dashboard/services/employees';
import { UserConfigService } from '../../../modules/dashboard/services/user-config'; // <--- AGREGADO
import { PERMISSIONS } from '../../../shared/constants/permissions';
import { Notification } from '../../../shared/interfaces/notification.interface';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatTooltipModule // <--- AGREGADO
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar implements OnInit {
  private authService = inject(AuthService);
  private branchesService = inject(BranchesService);
  private contextService = inject(ContextService);
  private employeesService = inject(EmployeesService);

  // 👇 INYECCIÓN PÚBLICA (Para usarlo en el HTML)
  public configService = inject(UserConfigService);

  currentUser: User | null = null;
  currentEmployee: Employee | null = null;

  // Variables para el Selector de Sucursales
  branches: Branch[] = [];
  selectedBranchId: string | null = null;
  canSwitchBranch = false;

  // --- 🔔 LÓGICA DE NOTIFICACIONES ---
  notificationCount = 0;
  notifications: Notification[] = [
    { id: '1', type: 'ANUNCIO', title: 'Mañana cierre temprano por fumigación', time: 'Hace 30 min', icon: 'campaign', color: 'warn', read: false },
    { id: '2', type: 'ENCUESTA', title: 'Nueva encuesta de clima laboral', time: 'Hace 2 horas', icon: 'poll', color: 'primary', read: false },
    { id: '3', type: 'SISTEMA', title: 'Bienvenido a PuntoPymes', time: 'Ayer', icon: 'info', color: 'accent', read: true }
  ];

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();

    if (this.currentUser && this.currentUser.id) {
      this.employeesService.getEmployeeById(this.currentUser.id).subscribe({
        next: (emp) => { this.currentEmployee = emp; },
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

  logout() {
    this.authService.logout();
  }

  updateNotificationCount() {
    this.notificationCount = this.notifications.filter(n => !n.read).length;
  }

  markAllRead() {
    this.notifications.forEach(n => n.read = true);
    this.updateNotificationCount();
  }

  loadBranches() {
    this.branchesService.getBranches().subscribe({
      next: (data) => { this.branches = data.filter(b => b.activa); },
      error: (err) => console.error('Error cargando sucursales', err)
    });
  }

  onBranchChange(branchId: string | null) {
    if (!branchId) {
      this.contextService.setBranch(null);
    } else {
      const selectedBranch = this.branches.find(b => b.id === branchId);
      if (selectedBranch) {
        this.contextService.setBranch({ id: selectedBranch.id, nombre: selectedBranch.nombre });
      } else {
        this.contextService.setBranch(branchId);
      }
    }
    window.location.reload();
  }

  // --- HELPERS ---
  get displayName(): string {
    if (this.currentEmployee) return `${this.currentEmployee.nombre} ${this.currentEmployee.apellido}`;
    if (this.currentUser) return this.currentUser.email?.split('@')[0] || 'Usuario';
    return 'Invitado';
  }

  get userRole(): string {
    if (this.currentEmployee?.cargo?.nombre) return this.currentEmployee.cargo.nombre;
    const roleMap: any = { 'admin': 'Administrador', 'gerente': 'Gerente', 'empleado': 'Colaborador' };
    return roleMap[this.currentUser?.role || ''] || this.currentUser?.role || 'Usuario';
  }

  get userAvatar(): string {
    return this.currentEmployee?.fotoUrl || this.currentUser?.fotoUrl || 'assets/images/default-avatar.png';
  }

  getBranchName(branchId: string | null): string {
    if (!branchId) return '';
    const branch = this.branches.find(b => b.id === branchId);
    return branch ? branch.nombre : '';
  }
}