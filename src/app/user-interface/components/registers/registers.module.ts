import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistersComponent } from './registers.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    RegistersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: "", component: RegistersComponent}])
  ]
})
export class RegistersModule { }
