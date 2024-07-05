import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomesComponent } from './homes.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: HomesComponent}
    ])
  ]
})
export class HomesModule { }
