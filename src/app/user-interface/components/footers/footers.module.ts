import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FootersComponent } from './footers.component';
import { RouterModule } from '@angular/router';



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
