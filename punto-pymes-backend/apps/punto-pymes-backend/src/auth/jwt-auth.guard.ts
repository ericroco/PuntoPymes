// apps/punto-pymes-backend/src/auth/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Este es el "Guardia" que pondremos en nuestras rutas.
 * Simplemente le dice a Nest.js que use la estrategia por defecto
 * que definimos en 'passport.module.ts', la cual es 'jwt'.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}