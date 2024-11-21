import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PopularsComponent } from './popular/populars.component';



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
