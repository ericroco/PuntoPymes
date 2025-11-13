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

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        // 1. Obtener el permiso requerido desde el decorador @RequirePermission
        const requiredPermission = this.reflector.get<string>(
            PERMISSION_KEY,
            context.getHandler(),
        );

        if (!requiredPermission) {
            return true;
        }

        // 2. Obtener el usuario (y sus permisos) desde el request
        const { user } = context.switchToHttp().getRequest();

        if (!user || !user.permisos) {
            throw new ForbiddenException('No tienes permisos (payload de usuario vacío).');
        }

        // 3. Lógica de validación
        const hasPermission = this.checkPermission(
            user.permisos,
            requiredPermission,
        );

        if (!hasPermission) {
            throw new ForbiddenException(
                `No tienes el permiso requerido: '${requiredPermission}'`,
            );
        }

        return true;
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