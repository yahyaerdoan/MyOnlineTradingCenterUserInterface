import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { RouterModule } from '@angular/router';
import { HeadersModule } from '../headers/headers.module';
import { HerosModule } from '../heros/heros.module';
import { WhyChoosesModule } from '../why-chooses/why-chooses.module';
import { FootersModule } from '../footers/footers.module';
import { TestimonialsModule } from '../testimonials/testimonials.module';



@NgModule({
  declarations: [AboutUsComponent],
  imports: [
    CommonModule,
    HeadersModule,
    HerosModule,
    WhyChoosesModule,
    //ourteams,
    TestimonialsModule,
    FootersModule,
    RouterModule.forChild([{path: "about-us", component: AboutUsComponent}])
  ],
  exports:[AboutUsComponent]
})
export class AboutUsModule { }
