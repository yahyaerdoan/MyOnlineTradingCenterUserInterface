import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadModule } from '../../../services/shared-services/components/file-upload/file-upload.module';
import { DialogModule } from '../../../dialogs/dialog.module';
import { SharedModule } from '../../../services/shared-services/shared.module';
import { OrdersComponent } from './order/orders.component';
import { ProductsRoutingModule } from '../products/product/products-routing.module';


@NgModule({
  declarations: [
    OrdersComponent,
    OrderListComponent,  
  ],
  imports: [
    SharedModule,
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ProductsRoutingModule,
    MatPaginator, MatPaginatorModule,
    MatTableModule,
    MatIconModule,
    FileUploadModule,
    DialogModule, 
    RouterModule.forChild([
      {path: '', component: OrdersComponent},
      { path: 'order-list', component: OrderListComponent }
    ])
  ]
})
export class OrdersModule { }
