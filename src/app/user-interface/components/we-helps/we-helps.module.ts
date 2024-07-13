import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeHelpsComponent } from './we-helps.component';
import { RouterModule } from '@angular/router';



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
