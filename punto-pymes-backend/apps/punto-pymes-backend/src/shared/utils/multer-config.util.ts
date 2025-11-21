import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';
import { BadRequestException } from '@nestjs/common';

/**
 * Tipo para definir la ruta: puede ser un string fijo o una función dinámica
 */
type FolderPath = string | ((req: any) => string);

export const createMulterOptions = (
    folderPath: FolderPath, // AHORA ACEPTA UNA FUNCIÓN
    maxFileSizeMB: number = 5,
    allowedTypes: RegExp = /\/(jpg|jpeg|png|pdf)$/,
) => {
    return {
        storage: diskStorage({
            destination: (req: any, file, cb) => {
                const empresaId = req.user?.empresaId || 'public';

                // 1. Calculamos la subcarpeta dinámicamente
                let subFolder = '';
                if (typeof folderPath === 'function') {
                    // Si es función, le pasamos el 'req' para que saque IDs de los params/body
                    subFolder = folderPath(req);
                } else {
                    subFolder = folderPath;
                }

                // 2. Construimos la ruta completa
                // Ej: uploads/EMPRESA_123/vacantes/VACANTE_ABC/cvs
                const uploadPath = join(process.cwd(), 'uploads', empresaId, subFolder);

                // 3. Crear carpeta recursivamente si no existe
                if (!existsSync(uploadPath)) {
                    mkdirSync(uploadPath, { recursive: true });
                }

                cb(null, uploadPath);
            },
            filename: (req, file, cb) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                cb(null, `${randomName}${extname(file.originalname)}`);
            },
        }),
        limits: { fileSize: maxFileSizeMB * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            if (!file.mimetype.match(allowedTypes)) {
                return cb(
                    new BadRequestException(`Tipo inválido. Se permite: ${allowedTypes}`),
                    false,
                );
            }
            cb(null, true);
        },
    };
};