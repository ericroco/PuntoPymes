// apps/punto-pymes-backend/src/auth/guards/permission.guard.ts
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { PERMISSION_KEY } from '../decorators/permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        const requiredPermission = this.reflector.get<string>(
            'permission',
            context.getHandler(),
        );

        if (!requiredPermission) {
            return true; // Si la ruta no pide permiso, pasa.
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        console.log('🛡️ PermissionGuard Check:');
        console.log('   - Usuario:', user?.email);
        console.log('   - Rol:', user?.rol);
        console.log('   - Permiso Requerido:', requiredPermission);
        console.log('   - Permisos del Usuario:', user?.permisos);

        if (!user || !user.permisos) {
            console.warn('   ⛔ Rechazado: Usuario sin permisos cargados.');
            return false;
        }

        // 1. Si es SuperAdmin, pase usted
        if (user.permisos.esAdmin) {
            console.log('   ✅ Aprobado (esAdmin)');
            return true;
        }

        // 2. Verificar el permiso específico
        const hasPermission = user.permisos[requiredPermission];

        if (hasPermission) {
            console.log(`   ✅ Aprobado (Tiene el permiso: ${requiredPermission})`);
            return true;
        }

        console.warn(`   ⛔ Rechazado (Falta el permiso: ${requiredPermission})`);
        return false;
    }

    /**
     * Función helper corregida para navegar un objeto JSON
     */
    private checkPermission(permisos: any, path: string): boolean {
        // --- INICIO DE LA CORRECCIÓN ---

        // 1. Primero, verificamos si el usuario es un Super-Admin (RNF20)
        //    Tu token tiene "esAdmin: true", así que esto debe ser 'true'
        if (permisos?.esAdmin === true) {
            return true;
        }

        // 2. Si NO es Admin, buscamos el permiso específico (ej. 'roles.create')
        const keys = path.split('.');
        let current = permisos;

        for (const key of keys) {
            if (current[key] === undefined || current[key] === null) {
                // El token no tiene 'roles' o 'roles.create'
                return false;
            }
            current = current[key];
        }

        // 3. Al final del bucle, el valor (ej. permisos.roles.create) debe ser 'true'
        return current === true;
        // --- FIN DE LA CORRECCIÓN ---
    }
}