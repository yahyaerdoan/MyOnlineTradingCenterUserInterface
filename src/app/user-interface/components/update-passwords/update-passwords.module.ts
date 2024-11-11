import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatePasswordComponent } from './update-password/update-password.component';
import { HeadersModule } from '../headers/headers.module';
import { FootersModule } from '../footers/footers.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    UpdatePasswordComponent
  ],
  imports: [
    CommonModule,
    HeadersModule,
    FootersModule,
    ReactiveFormsModule,
    RouterModule.forChild([{path: "update-password", component: UpdatePasswordComponent}
    ]),
  ]
})
export class UpdatePasswordsModule { }
