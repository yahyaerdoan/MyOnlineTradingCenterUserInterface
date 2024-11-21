import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CustomersComponent } from './customer/customers.component';



@NgModule({
  declarations: [
    CustomersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component : CustomersComponent}
    ])
  ]
})
export class CustomersModule { }
