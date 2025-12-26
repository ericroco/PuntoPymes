import { Component, Inject, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatIcon } from '@angular/material/icon';

import { AssetService } from '../../services/asset';
import { Asset, AssignAssetDto } from '../../models/asset.models';

@Component({
  selector: 'app-asset-assign-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatButtonModule, MatFormFieldModule, MatInputModule,
    MatDatepickerModule, MatNativeDateModule, MatAutocompleteModule, MatIcon
  ],
  templateUrl: './asset-assign-dialog.html',
  styleUrls: ['./asset-assign-dialog.scss']
})
export class AssetAssignDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private assetService = inject(AssetService);
  private snackBar = inject(MatSnackBar);

  form: FormGroup;
  isLoading = false;

  // Lista original de empleados
  allEmployees: any[] = [];
  // Observable para el filtro del buscador
  filteredEmployees$!: Observable<any[]>;

  constructor(
    public dialogRef: MatDialogRef<AssetAssignDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { asset: Asset }
  ) {
    this.form = this.fb.group({
      empleadoSeleccionado: ['', [Validators.required]], // Control visual (input texto)
      empleadoId: ['', [Validators.required]],          // Control lógico (ID real)
      fechaAsignacion: [new Date(), [Validators.required]],
      observaciones: ['']
    });
  }

  ngOnInit(): void {
    // 1. Cargar empleados
    this.assetService.getEmployeesShortList().subscribe(users => {
      this.allEmployees = users;

      // 2. Configurar el filtro de búsqueda
      this.filteredEmployees$ = this.form.get('empleadoSeleccionado')!.valueChanges.pipe(
        startWith(''),
        map(value => {
          const name = typeof value === 'string' ? value : value?.nombre;
          return name ? this._filter(name as string) : this.allEmployees.slice();
        })
      );
    });
  }

  // Helper para filtrar la lista
  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.allEmployees.filter(option =>
      // Busca por nombre o apellido
      (option.nombre + ' ' + option.apellido).toLowerCase().includes(filterValue)
    );
  }

  // Cuando el usuario selecciona una opción del autocomplete
  displayFn(user: any): string {
    return user ? `${user.nombre} ${user.apellido || ''}` : '';
  }

  onOptionSelected(event: any) {
    const user = event.option.value;
    // Guardamos el ID en el control oculto
    this.form.patchValue({ empleadoId: user.id });
  }

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    const formValue = this.form.value;

    const dto: AssignAssetDto = {
      empleadoId: formValue.empleadoId, // Usamos el ID oculto
      fechaAsignacion: formValue.fechaAsignacion,
      observaciones: formValue.observaciones
    };

    this.assetService.assignAsset(this.data.asset.id, dto).subscribe({
      next: () => {
        this.snackBar.open(`Equipo asignado correctamente`, 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.snackBar.open('Error al asignar', 'Cerrar');
      }
    });
  }
}