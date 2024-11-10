import { Component, Inject } from '@angular/core';
import { BaseDialogModel } from '../base-dialog/base-dialog-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrl: './order-detail-dialog.component.scss'
})
export class OrderDetailDialogComponent extends BaseDialogModel<OrderDetailDialogComponent> {

  constructor(@Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState,
    dialogRef: MatDialogRef<OrderDetailDialogComponent>) { super(dialogRef) }
}
export enum OrderDetailDialogState {
  Yes = 'Yes',
  No = 'No'
}
