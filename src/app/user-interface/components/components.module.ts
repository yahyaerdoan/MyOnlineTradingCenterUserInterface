import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomesModule } from './homes/homes.module';
import { ProductsModule } from './products/products.module';
import { BasketsModule } from './baskets/baskets.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomesModule,
    ProductsModule,
    BasketsModule  
  ]
})
export class ComponentsModule { }
