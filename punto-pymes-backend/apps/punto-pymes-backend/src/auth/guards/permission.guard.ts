import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSION_KEY } from '../decorators/permission.decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean {
        // 1. Obtener el permiso que pide la ruta (Decorador)
        const requiredPermission = this.reflector.get<string>(
            'permission', // O usa PERMISSION_KEY si importas la constante
            context.getHandler(),
        );

        if (!requiredPermission) {
            return true; // 🟢 Ruta pública (sin requisitos)
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const permisos = user?.permisos;

        console.log('🛡️ PermissionGuard Check:');
        console.log(`   - Usuario: ${user?.email}`);
        console.log(`   - Pide: "${requiredPermission}"`);
        // console.log('   - Permisos Usuario:', permisos); // Descomenta si quieres ver todo el JSON

        if (!user || !permisos) {
            console.warn('   ⛔ Rechazado: Usuario sin datos de permisos.');
            return false;
        }

        // ============================================================
        // ESTRATEGIA 1: SUPER ADMIN (Funciona para ambos mundos)
        // ============================================================
        // Caso A: Objeto con flag { esAdmin: true }
        if (permisos.esAdmin === true) {
            console.log('   ✅ Aprobado (SuperAdmin Flag)');
            return true;
        }
        // Caso B: Array con Wildcard ['*']
        if (Array.isArray(permisos) && permisos.includes('*')) {
            console.log('   ✅ Aprobado (SuperAdmin Wildcard)');
            return true;
        }

        // ============================================================
        // ESTRATEGIA 2: ARRAY DE STRINGS (Lógica Nueva)
        // ============================================================
        // Ejemplo: ['empleados.crear', 'ventas.ver']
        if (Array.isArray(permisos)) {
            const tienePermiso = permisos.includes(requiredPermission);
            if (tienePermiso) {
                console.log(`   ✅ Aprobado (Array: Encontrado)`);
                return true;
            } else {
                console.warn(`   ⛔ Rechazado (Array: No encontrado)`);
                return false;
            }
        }

        // ============================================================
        // ESTRATEGIA 3: OBJETOS (Lógica Antigua)
        // ============================================================

        // Intento A: Acceso directo tipo diccionario { 'empleados.crear': true }
        if (permisos[requiredPermission] === true) {
            console.log(`   ✅ Aprobado (Objeto Directo)`);
            return true;
        }

        // Intento B: Acceso Anidado Recursivo { empleados: { crear: true } }
        // Llamamos a tu función helper
        if (this.checkNestedPermission(permisos, requiredPermission)) {
            console.log(`   ✅ Aprobado (Objeto Anidado)`);
            return true;
        }

        console.warn(`   ⛔ Rechazado (No se encontró en ninguna estructura)`);
        return false;
    }

    /**
     * Tu función helper original para navegar objetos anidados
     * Ej: path = "empleados.crear" -> busca permisos["empleados"]["crear"]
     */
    private checkNestedPermission(permisos: any, path: string): boolean {
        if (!permisos || typeof permisos !== 'object') return false;

        const keys = path.split('.');
        let current = permisos;

        for (const key of keys) {
            if (current[key] === undefined || current[key] === null) {
                return false;
            }
            current = current[key];
        }

        return current === true;
    }
}