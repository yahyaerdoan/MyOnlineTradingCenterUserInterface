import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouterModule } from '@angular/router';
import { HeadersModule } from '../headers/headers.module';
import { FootersModule } from '../footers/footers.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    HeadersModule,
    FootersModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: "reset-password", component: ResetPasswordComponent}
    ]),
  ]
})
export class ResetPasswordsModule { }
