import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeadersComponent } from './header/headers.component';



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
