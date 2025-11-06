// apps/punto-pymes-backend/src/auth/jwt.strategy.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(configService: ConfigService) {
        const secret = configService.get<string>('JWT_SECRET');

        // Validar que el secret existe
        if (!secret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: secret, // Ahora TypeScript sabe que no es undefined
        });
    }

    /**
     * 4. El método "validate" (El más importante)
     *
     * Si la firma del token es válida y el token no ha expirado
     * (Passport lo verifica automáticamente usando las opciones de arriba),
     * SÓLO ENTONCES se ejecuta este método.
     *
     * Recibe como argumento el "payload" (el contenido) que
     * pusimos dentro del token en el 'auth_service'.
     * (Recuerda: payload = { sub: '...', email: '...' })
     */
    async validate(payload: any) {
        // (INICIO DEL CAMBIO)
        // Ahora, todo el payload se pasa a req.user.
        // req.user será:
        // {
        //   "sub": "...",
        //   "email": "...",
        //   "empresaId": "...",
        //   "empleadoId": "...",
        //   "rol": "...",
        //   "permisos": { ... }
        // }
        return payload;
        // (FIN DEL CAMBIO)
    }
}