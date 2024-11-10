import { Component, Inject, OnInit } from '@angular/core';
import { BaseDialogModel } from '../base-dialog/base-dialog-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OrderService } from '../../services/core-services/feature-services/order.service';
import { OrderDetailDto } from '../../contracts/order/models/order-detail.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../services/interface-services/admin/services/alertify.service';
import { SpinnerType } from '../../bases/bases.component';

@Component({
  selector: 'app-order-detail-dialog',
  templateUrl: './order-detail-dialog.component.html',
  styleUrl: './order-detail-dialog.component.scss',
})
export class OrderDetailDialogComponent extends BaseDialogModel<OrderDetailDialogComponent> implements OnInit {

  orderDetailResponse: OrderDetailDto = new OrderDetailDto();

  constructor(@Inject(MAT_DIALOG_DATA) public data: OrderDetailDialogState | string,
    dialogRef: MatDialogRef<OrderDetailDialogComponent>, private alertifyService: AlertifyService,
    private orderService: OrderService, private spinnerService: NgxSpinnerService) { super(dialogRef); this.spinnerService = spinnerService; }

  ngOnInit(): void {
    this.getOrderDetailById();
  }

  async getOrderDetailById(): Promise<void> {
    this.spinnerService.show(SpinnerType.BallScaleMultiple);
    const response = await this.orderService.getOrderDetailById(this.data,
      (successMessage) => this.alertifyService.message(successMessage, { dismissOthers: true, messageType: MessageType.Success, position: Position.TopRight }),
      (errorMessage) => this.alertifyService.message(errorMessage, { dismissOthers: true, messageType: MessageType.Error, position: Position.TopRight }));
      this.spinnerService.hide(SpinnerType.BallScaleMultiple);
    if (response && response.isSuccessful) {
      this.orderDetailResponse = response.resultData.orderDetailDto;
    }
    this.spinnerService.hide(SpinnerType.BallScaleMultiple);
  };
}

export enum OrderDetailDialogState {
  Close = 'Close',
  CompleteThisOrder = 'ComplateThisOrder'
}
