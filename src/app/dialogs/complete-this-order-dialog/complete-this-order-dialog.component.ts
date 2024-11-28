import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialogModel } from '../base-dialog/base-dialog-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertifyService } from '../../services/interface-services/admin/services/alertify.service';
import { OrderService } from '../../services/core-services/feature-services/order.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-complete-this-order-dialog',
  templateUrl: './complete-this-order-dialog.component.html',
  styleUrl: './complete-this-order-dialog.component.scss'
})
export class CompleteThisOrderDialogComponent extends BaseDialogModel<CompleteThisOrderDialogComponent> implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: CompleteThisOrderDialogState | string,
  dialogRef: MatDialogRef<CompleteThisOrderDialogComponent>, private alertifyService: AlertifyService,
  private orderService: OrderService, private spinnerService: NgxSpinnerService) { super(dialogRef); this.spinnerService = spinnerService; }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  completeTheOrder(){
    
  }

}

export enum CompleteThisOrderDialogState {
  Close = 'Close',
  ComplateThisOrder = 'CompleteThisOrder'
}
