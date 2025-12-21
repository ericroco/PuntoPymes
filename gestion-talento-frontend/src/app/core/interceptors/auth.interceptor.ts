import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ContextService } from '../../modules/dashboard/services/context'; // 👈 Asegúrate de importar esto

export const authInterceptor: HttpInterceptorFn = (req, next) => {

    // 1. Inyectamos el servicio de contexto para leer la sucursal seleccionada
    const contextService = inject(ContextService);

    // 2. Obtenemos los valores del almacenamiento
    const token = localStorage.getItem('token');
    const branchId = contextService.getBranch();

    // 3. Preparamos un objeto para guardar los headers que vamos a agregar
    let newHeaders: any = {};

    // A. Si hay Token, agregamos Authorization
    if (token) {
        newHeaders['Authorization'] = `Bearer ${token}`;
    }

    // B. Si hay Sucursal seleccionada, agregamos el header personalizado
    if (branchId) {
        newHeaders['x-sucursal-id'] = branchId;
    }

    // 4. Si hay algo que agregar (Token O Sucursal), clonamos la petición UNA sola vez
    if (Object.keys(newHeaders).length > 0) {
        const clonedReq = req.clone({
            setHeaders: newHeaders
        });
        return next(clonedReq);
    }

    // 5. Si no hay ni token ni sucursal, pasa la petición limpia
    return next(req);
};