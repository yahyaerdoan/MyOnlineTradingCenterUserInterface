import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TestimonialsComponent } from './testimonial/testimonials.component';



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
