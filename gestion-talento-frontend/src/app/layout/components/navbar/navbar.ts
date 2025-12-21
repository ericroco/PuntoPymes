import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 Necesario para [(ngModel)]
import { AuthService, User } from '../../../modules/auth/services/auth';

// 👇 Material Modules para el Dropdown
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

// 👇 Servicios y Constantes
import { BranchesService, Branch } from '../../../modules/organization/services/branches';
import { ContextService } from '../../../modules/dashboard/services/context'; // Ajusta la ruta si es necesario
import { PERMISSIONS } from '../../../shared/constants/permissions'; // Ajusta la ruta

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss']
})
export class Navbar implements OnInit {
  private authService = inject(AuthService);
  private branchesService = inject(BranchesService);
  private contextService = inject(ContextService);

  currentUser: User | null = null;
  notificationCount = 3;

  // Variables para el Selector de Sucursales
  branches: Branch[] = [];
  selectedBranchId: string | null = null;
  canSwitchBranch = false;

  ngOnInit(): void {
    this.currentUser = this.authService.getUser();

    // 1. Inicializar el valor actual del selector
    this.selectedBranchId = this.contextService.getBranch();

    // 2. Verificar si tiene permiso para ver el selector
    // Usamos el permiso de gestión de sucursales (Admin)
    if (this.authService.hasPermission(PERMISSIONS.BRANCHES_MANAGE)) {
      this.canSwitchBranch = true;
      this.loadBranches();
    }
  }

  loadBranches() {
    this.branchesService.getBranches().subscribe({
      next: (data) => {
        // Filtramos solo las activas (opcional)
        this.branches = data.filter(b => b.activa);
      },
      error: (err) => console.error('Error cargando sucursales para el header', err)
    });
  }

  onBranchChange(branchId: string | null) {
    // 1. Si es nulo (Todas las sedes)
    if (!branchId) {
      this.contextService.setBranch(null);
    }
    // 2. Si seleccionó una sede, BUSCAMOS EL NOMBRE en tu array 'branches'
    else {
      const selectedBranch = this.branches.find(b => b.id === branchId);

      if (selectedBranch) {
        // Enviamos el objeto completo para que se guarde el nombre
        this.contextService.setBranch({
          id: selectedBranch.id,
          nombre: selectedBranch.nombre // <--- Esto permite que Documentos muestre el nombre
        });
      } else {
        // Fallback por si acaso (envía solo ID)
        this.contextService.setBranch(branchId);
      }
    }

    // 3. Recarga para aplicar cambios
    window.location.reload();
  }
  // --- Helpers existentes ---
  get displayName(): string {
    if (!this.currentUser) return 'Invitado';
    return this.currentUser.email || this.currentUser.email?.split('@')[0] || 'Usuario';
  }

  get userRole(): string {
    return this.currentUser?.role || 'Usuario';
  }

  get userAvatar(): string {
    return this.currentUser?.fotoUrl || 'assets/images/default-avatar.png';
  }
}