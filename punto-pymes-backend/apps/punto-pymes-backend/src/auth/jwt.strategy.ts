// apps/punto-pymes-backend/src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        const secret = configService.get<string>('JWT_SECRET');

        if (!secret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
    }

    async validate(payload: any) {
        // 🔥 LOG DE DEBUGGING (puedes quitarlo después)
        console.log('🔑 JWT Strategy - Payload recibido:', payload);

        // 👇 RETORNAMOS AMBAS VERSIONES PARA COMPATIBILIDAD TOTAL
        const user = {
            // Propiedades originales (para servicios existentes)
            userId: payload.sub,
            email: payload.email,
            empresaId: payload.empresaId,
            empleadoId: payload.empleadoId,
            rolId: payload.rolId,
            role: payload.role,
            permisos: payload.permisos,
            sucursalId: payload.sucursalId,

            // 👇 ALIASES ADICIONALES (para compatibilidad total)
            sub: payload.sub,              // Alias de userId
            id: payload.sub,               // Otro alias común
            rol: payload.rol,              // Por si algún servicio usa 'rol' en vez de 'rolId'
        };

        console.log('✅ JWT Strategy - Usuario validado (compatible con todo):', user);

        return user;
    }
}