import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInsComponent } from './log-ins.component';
import { RouterModule } from '@angular/router';
import { HeadersModule } from '../headers/headers.module';
import { FootersModule } from '../footers/footers.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LogInsComponent
  ],
  imports: [
    CommonModule,
    HeadersModule,
    FootersModule,
    RouterModule.forChild([{path: "logins", component: LogInsComponent}
    ]),
    ReactiveFormsModule
  ]
})
export class LogInsModule { }
