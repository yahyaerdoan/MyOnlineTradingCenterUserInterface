import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistersComponent } from './registers.component';
import { RouterModule } from '@angular/router';
import { HeadersModule } from '../headers/headers.module';
import { FootersModule } from '../footers/footers.module';
import { LayoutComponent } from '../../../admin-interface/layout/layout.component';



@NgModule({
  declarations: [
    RegistersComponent
  ],
  imports: [
    CommonModule,
    HeadersModule,
    FootersModule,
    RouterModule.forChild([{path: "registers", component: RegistersComponent}
    ])
  ]
})
export class RegistersModule { }
