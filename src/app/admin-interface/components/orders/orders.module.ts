import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductsRoutingModule } from '../products/products-routing.module';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadModule } from '../../../services/shared/components/file-upload/file-upload.module';
import { DialogModule } from '../../../dialogs/dialog.module';
import { DeleteDirective } from '../../../directives/admin/delete.directive';



@NgModule({
  declarations: [
    OrdersComponent,
    OrderListComponent,
    DeleteDirective
  
  ],
  imports: [
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
   // MatDialogModule,
    FileUploadModule,
    DialogModule, 
    RouterModule.forChild([
      {path: '', component: OrdersComponent},
      { path: 'order-list', component: OrderListComponent }
    ])
  ]
})
export class OrdersModule { }
