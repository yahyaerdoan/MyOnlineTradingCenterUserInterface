import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersModule } from './customers/customers.module';
import { DashboardsModule } from './dashboards/dashboards.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';



@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    ProductsModule,
    OrdersModule,
    CustomersModule,
    DashboardsModule    
  ]
})
export class ComponentsModule { }
