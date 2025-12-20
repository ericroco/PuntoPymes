import { Component, Inject, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';

import { AssetService } from '../../services/asset';
import { Asset } from '../../models/asset.models';

@Component({
  selector: 'app-asset-history-dialog',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, MatButtonModule,
    MatTableModule, MatIconModule, MatProgressSpinnerModule, DatePipe
  ],
  templateUrl: './asset-history-dialog.html',
  styleUrls: ['./asset-history-dialog.scss']
})
export class AssetHistoryDialogComponent implements OnInit {
  private assetService = inject(AssetService);

  history: any[] = [];
  isLoading = true;
  displayedColumns = ['fecha', 'empleado', 'observaciones', 'estado'];

  constructor(
    public dialogRef: MatDialogRef<AssetHistoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { asset: Asset }
  ) { }

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.assetService.getAssetHistory(this.data.asset.id).subscribe({
      next: (data) => {
        this.history = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}