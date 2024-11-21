import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FootersComponent } from './footer/footers.component';



@NgModule({
  declarations: [
    FootersComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: FootersComponent}
    ])
  ],
  exports:[FootersComponent]
})
export class FootersModule { }
