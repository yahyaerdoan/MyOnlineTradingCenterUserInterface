import { Component, OnInit, ViewChild } from '@angular/core';
import { BasesComponent, SpinnerType } from '../../../../bases/bases.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/features/admin/services/alertify.service';
import { DialogService } from '../../../../services/shared/services/dialog.service';
import { OrderService } from '../../../../services/core/models/order.service';
import { Order } from '../../../../contracts/order/models/order.model';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent  extends BasesComponent implements OnInit {
  displayedColumns: string[] = [
    'orderId', 'orderNumber', 'userName', 'createdDate', 'totalAmount', 'actions',
  ];
  dataSource: MatTableDataSource<Order> | null = null;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    spinner: NgxSpinnerService,
    private orderService: OrderService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
  ) {
    super(spinner);
  }
 
  async ngOnInit() {
    await this.getOrders();
  }
  async changePageAndData() {
    await this.getOrders();
  }
  async getOrders() {
    this.showSpinner(SpinnerType.BallScaleMultiple);
    const result = await this.orderService.getOrders(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        (successMessage) => this.alertifyService.message(successMessage, { dismissOthers: true, messageType: MessageType.Success, position: Position.TopRight }),       
        (errorMessage) => this.alertifyService.message(errorMessage, { dismissOthers: true, messageType: MessageType.Error, position: Position.TopRight })       
    );
    this.hideSpinner(SpinnerType.BallScaleMultiple)
    if (result) {
        this.dataSource = new MatTableDataSource<Order>(result.resultData.orders);
        this.paginator.length = result.resultData.totalOrderCount;
    }
    this.hideSpinner(SpinnerType.BallScaleMultiple);
}


  updateProduct(product: any) {
    // Navigate to the update product page or open a dialog
  }

  getOrderDetail(id: any){
    console.log("order detail id:", id)
  }
}
