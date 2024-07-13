import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadersComponent } from './headers.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeadersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: HeadersComponent}
    ])
  ],
  exports: [
    HeadersComponent
  ]
})
export class HeadersModule { }
