// apps/punto-pymes-backend/src/auth/decorators/permission.decorator.ts
import { SetMetadata } from '@nestjs/common';

export const PERMISSION_KEY = 'require_permission';

/**
 * Decorador para rutas que requieren un permiso específico.
 * @param permission El string del permiso (ej. 'roles.create', 'empleados.delete')
 */
export const RequirePermission = (permission: string) =>
  SetMetadata(PERMISSION_KEY, permission);