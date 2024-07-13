import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopularsComponent } from './populars.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PopularsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: PopularsComponent}
    ])
  ],
  exports:[PopularsComponent]
})
export class PopularsModule { }
