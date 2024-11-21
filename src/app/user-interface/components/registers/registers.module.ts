import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeadersModule } from '../headers/headers.module';
import { FootersModule } from '../footers/footers.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistersComponent } from './register/registers.component';



@NgModule({
  declarations: [
    RegistersComponent
  ],
  imports: [
    CommonModule,
    HeadersModule,
    FootersModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: "registers", component: RegistersComponent}
    ])    
  ]
})
export class RegistersModule { }
