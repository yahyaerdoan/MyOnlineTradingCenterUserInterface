import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WeHelpsComponent } from './we-help/we-helps.component';



@NgModule({
  declarations: [
    WeHelpsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: WeHelpsComponent}
    ])
  ],
  exports:[WeHelpsComponent]
})
export class WeHelpsModule { }
