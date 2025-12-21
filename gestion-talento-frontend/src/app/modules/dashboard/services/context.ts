import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ContextService {

    // 1. Inicializamos con el ID guardado
    private branchSubject = new BehaviorSubject<string | null>(localStorage.getItem('selectedBranchId'));

    // 2. EXPOSICIÓN DOBLE (Para compatibilidad antigua y nueva)
    selectedBranch$ = this.branchSubject.asObservable(); // Para tu código viejo
    branch$ = this.branchSubject.asObservable();         // Para el código nuevo (Documentos)

    /**
     * Guarda la sucursal.
     * Acepta: 
     * - null (Todas)
     * - string (Solo ID, modo compatibilidad)
     * - Objeto {id, nombre} (Modo ideal)
     */
    setBranch(branch: string | { id: string, nombre: string } | null) {
        if (!branch) {
            // Caso: "Todas las sedes"
            localStorage.removeItem('selectedBranchId');
            localStorage.removeItem('selectedBranchName');
            this.branchSubject.next(null);
            return;
        }

        // Caso: Nos envían un objeto completo { id: '...', nombre: '...' }
        if (typeof branch === 'object' && branch.id) {
            localStorage.setItem('selectedBranchId', branch.id);
            localStorage.setItem('selectedBranchName', branch.nombre);
            this.branchSubject.next(branch.id);
        }
        // Caso: Nos envían solo el ID (string) -> Compatibilidad con tu Navbar actual
        else if (typeof branch === 'string') {
            localStorage.setItem('selectedBranchId', branch);
            // No tenemos el nombre nuevo, así que no tocamos 'selectedBranchName' 
            // o lo dejamos como estaba para no borrarlo accidentalmente.
            this.branchSubject.next(branch);
        }
    }

    getBranch(): string | null {
        return this.branchSubject.value;
    }

    // 👇 ESTO SOLUCIONA EL ERROR EN DOCUMENTOS
    getBranchName(): string | null {
        return localStorage.getItem('selectedBranchName');
    }
}