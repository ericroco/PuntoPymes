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
import { MatIcon } from '@angular/material/icon';

import { AssetService } from '../../services/asset';
import { Asset, AssetStatus, CreateAssetDto } from '../../models/asset.models';

@Component({
  selector: 'app-asset-form-dialog',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule, MatDialogModule,
    MatButtonModule, MatFormFieldModule, MatInputModule,
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatIcon
  ],
  templateUrl: './asset-form-dialog.html',
  styleUrls: ['./asset-form-dialog.scss'] // Opcional si tienes estilos
})
export class AssetFormDialogComponent implements OnInit {
  private fb = inject(FormBuilder);
  private assetService = inject(AssetService);
  private snackBar = inject(MatSnackBar);

  form: FormGroup;
  isEditing = false;
  isLoading = false;

  // Opciones para el select
  assetStatuses = Object.values(AssetStatus);

  constructor(
    public dialogRef: MatDialogRef<AssetFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { asset?: Asset }
  ) {
    this.isEditing = !!data.asset;

    // Inicializar Formulario
    this.form = this.fb.group({
      nombre: [data.asset?.nombre || '', [Validators.required]],
      tipo: [data.asset?.tipo || '', [Validators.required]], // Categoría
      serial: [data.asset?.serial || ''],
      valor: [data.asset?.valor || 0, [Validators.min(0)]],
      estado: [data.asset?.estado || AssetStatus.DISPONIBLE, [Validators.required]],
      fechaAdquisicion: [data.asset?.fechaAdquisicion || new Date()],
      descripcion: [data.asset?.descripcion || ''],
      imageUrl: [data.asset?.imageUrl || '']
    });
  }

  ngOnInit(): void { }

  onSubmit() {
    if (this.form.invalid) return;

    this.isLoading = true;
    const formValue = this.form.value;

    // --- LÓGICA INTELIGENTE DE SERIAL ---
    let serialParaEnviar = null;

    if (formValue.serial && typeof formValue.serial === 'string') {
      const textoLimpio = formValue.serial.trim().toUpperCase();

      // Lista de textos que significan "No tiene serial"
      // Si escriben cualquiera de estos, enviaremos null para que NO de error de duplicado.
      const invalidos = ['S/N', 'SN', 'N/A', 'NA', 'SIN SERIAL', 'NO APLICA', ''];

      if (!invalidos.includes(textoLimpio)) {
        // Si NO está en la lista de invalidos (es un serial real como "ABC-123"), lo enviamos.
        serialParaEnviar = textoLimpio;
      }
      // Si SÍ está en la lista (ej: es "S/N"), serialParaEnviar se queda en null.
    }
    // ------------------------------------

    const dto: CreateAssetDto = {
      ...formValue,
      serial: serialParaEnviar, // 👈 Ahora enviará null si pusieron "S/N"
      fechaAdquisicion: formValue.fechaAdquisicion
    };

    // --- EL RESTO SIGUE IGUAL ---
    if (this.isEditing && this.data.asset) {
      this.assetService.updateAsset(this.data.asset.id, dto).subscribe({
        next: () => {
          this.snackBar.open('Activo actualizado', 'Cerrar', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error(err); // Mira la consola si falla
          this.isLoading = false;
          // Tip: Si es error de duplicado, el backend suele devolver 409 Conflict
          const msg = err.status === 409 ? 'Ese serial ya existe en otro activo.' : 'Error al actualizar';
          this.snackBar.open(msg, 'Cerrar');
        }
      });
    } else {
      this.assetService.createAsset(dto).subscribe({
        next: () => {
          this.snackBar.open('Activo creado exitosamente', 'Cerrar', { duration: 3000 });
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error(err);
          this.isLoading = false;
          const msg = err.status === 409 ? 'Ese serial ya existe en otro activo.' : 'Error al crear activo';
          this.snackBar.open(msg, 'Cerrar');
        }
      });
    }
  }
}