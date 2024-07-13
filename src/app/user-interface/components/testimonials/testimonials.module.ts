import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestimonialsComponent } from './testimonials.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    TestimonialsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: TestimonialsComponent}
    ])
  ],
  exports:[TestimonialsComponent]
})
export class TestimonialsModule { }
