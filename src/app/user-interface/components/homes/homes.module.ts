import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomesComponent } from './homes.component';
import { RouterModule } from '@angular/router';
import { HeadersModule } from '../headers/headers.module';
import { HerosModule } from '../heros/heros.module';
import { ProductsModule } from '../products/products.module';
import { WhyChoosesModule } from '../why-chooses/why-chooses.module';
import { WeHelpsModule } from '../we-helps/we-helps.module';
import { PopularsModule } from '../populars/populars.module';
import { TestimonialsModule } from '../testimonials/testimonials.module';
import { BlogsModule } from "../blogs/blogs.module";
import { ComponentsModule } from "../../../admin-interface/layout/components/components.module";
import { FootersModule } from '../footers/footers.module';



@NgModule({
  declarations: [
    HomesComponent,
  ],
  imports: [
    ComponentsModule,
    CommonModule,
    
    HeadersModule,
    HerosModule,
    ProductsModule,
    WhyChoosesModule,
    WeHelpsModule,
    PopularsModule,
    TestimonialsModule,
    BlogsModule,
    FootersModule,
    BlogsModule,   
    RouterModule.forChild([
        { path: "", component: HomesComponent }
    ])    
],
  exports: [HomesComponent]
})
export class HomesModule { }
