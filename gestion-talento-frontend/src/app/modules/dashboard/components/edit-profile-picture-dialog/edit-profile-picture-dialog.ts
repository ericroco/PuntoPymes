import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageCropperComponent, ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper'; // Importar librería

@Component({
  selector: 'app-edit-profile-picture-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ImageCropperComponent // Importar componente de la librería
  ],
  templateUrl: './edit-profile-picture-dialog.html',
  styleUrls: ['./edit-profile-picture-dialog.scss']
})
export class EditProfilePictureDialog {
  imageChangedEvent: any = '';
  croppedImage: Blob | null | undefined = null;

  constructor(
    public dialogRef: MatDialogRef<EditProfilePictureDialog>
  ) { }

  // 1. Detectar cuando el usuario selecciona un archivo
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  // 2. Cada vez que el usuario mueve el recorte
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.blob; // Obtenemos el Blob (el archivo recortado)
  }

  imageLoaded(image?: LoadedImage) {
    // Imagen cargada y lista para recortar
  }

  cropperReady() {
    // Recortador listo
  }

  loadImageFailed() {
    // Error
    console.error('Error al cargar la imagen');
  }

  save() {
    if (this.croppedImage) {
      // Convertir Blob a File para enviarlo al servicio
      // Le ponemos un nombre genérico, el backend lo renombrará
      const file = new File([this.croppedImage], "profile_picture.png", { type: "image/png" });
      this.dialogRef.close(file);
    }
  }
}