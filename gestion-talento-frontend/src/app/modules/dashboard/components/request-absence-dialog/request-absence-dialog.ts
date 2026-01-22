import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';

import { TipoSolicitud } from '../../services/vacation';

@Component({
    selector: 'app-request-absence-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule
    ],
    templateUrl: './request-absence-dialog.html',
    styleUrls: ['./request-absence-dialog.scss']
})
export class RequestAbsenceDialog {
    private fb = inject(FormBuilder);
    private dialogRef = inject(MatDialogRef<RequestAbsenceDialog>);

    form: FormGroup;

    tiposAusencia = [
        { value: TipoSolicitud.CALAMIDAD, label: 'Calamidad Doméstica' },
        { value: TipoSolicitud.SALUD, label: 'Cita Médica / Salud' },
        { value: TipoSolicitud.TRAMITE, label: 'Trámite Personal' },
        { value: TipoSolicitud.OTROS, label: 'Otros' }
    ];

    constructor() {
        this.form = this.fb.group({
            tipo: ['', Validators.required],
            start: [null, Validators.required],
            end: [null, Validators.required],
            justificacion: ['', [Validators.required, Validators.minLength(10)]]
        });
    }

    onSubmit() {
        if (this.form.valid) {
            const { start, end, tipo, justificacion } = this.form.value;

            const payload = {
                tipo,
                fechaInicio: this.formatDate(start),
                fechaFin: this.formatDate(end),
                justificacion
            };

            this.dialogRef.close(payload);
        } else {
            this.form.markAllAsTouched();
        }
    }

    onCancel() {
        this.dialogRef.close();
    }

    private formatDate(date: Date): string {
        const d = new Date(date);
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        return d.toISOString().split('T')[0];
    }
}