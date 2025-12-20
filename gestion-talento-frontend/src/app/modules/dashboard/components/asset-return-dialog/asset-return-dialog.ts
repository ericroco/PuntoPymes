import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AssetService } from '../../services/asset';
import { Asset, AssetStatus, ReturnAssetDto } from '../../models/asset.models';

@Component({
  selector: 'app-asset-return-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatButtonModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule
  ],
  templateUrl: './asset-return-dialog.html',
  styleUrls: ['./asset-return-dialog.scss']
})
export class AssetReturnDialogComponent {
  private fb = inject(FormBuilder);
  private assetService = inject(AssetService);
  private snackBar = inject(MatSnackBar);

  form: FormGroup;
  isLoading = false;

  // Estados posibles al devolver (No puede volver como Asignado)
  returnStatuses = [
    AssetStatus.DISPONIBLE,
    AssetStatus.EN_REPARACION,
    AssetStatus.DE_BAJA
  ];

  constructor(
    public dialogRef: MatDialogRef<AssetReturnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { asset: Asset }
  ) {
    this.form = this.fb.group({
      fechaDevolucion: [new Date(), [Validators.required]],
      estado: [AssetStatus.DISPONIBLE, [Validators.required]], // Por defecto vuelve sano
      observaciones: ['', [Validators.required]] // Obligatorio documentar
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    this.isLoading = true;

    // 1. Obtener ID de la asignación del objeto Asset
    // IMPORTANTE: Asegúrate de que tu backend esté enviando 'asignadoA.id'
    const asignacionId = this.data.asset.asignadoA?.id;

    if (!asignacionId) {
      this.snackBar.open('Error: No se encontró la asignación activa en los datos.', 'Cerrar');
      this.isLoading = false;
      return;
    }

    const formValue = this.form.value;

    // 2. Preparar DTO
    const dto: ReturnAssetDto = {
      fechaDevolucion: formValue.fechaDevolucion,
      observaciones: formValue.observaciones,
      estado: formValue.estado
    };

    // 3. Llamar al servicio
    this.assetService.returnAsset(asignacionId, dto).subscribe({
      next: () => {
        this.snackBar.open('Devolución registrada correctamente', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true); // Cierra y avisa para refrescar
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.snackBar.open('Error al registrar devolución', 'Cerrar');
      }
    });
  }
}