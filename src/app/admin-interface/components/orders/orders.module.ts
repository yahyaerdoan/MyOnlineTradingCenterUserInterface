import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';



@NgModule({
  declarations: [
    OrdersComponent,
    OrderListComponent
  
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: OrdersComponent},
      { path: 'order-list', component: OrderListComponent }
    ])
  ]
})
export class OrdersModule { }
