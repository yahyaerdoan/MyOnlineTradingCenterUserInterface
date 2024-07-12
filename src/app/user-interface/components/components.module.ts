import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { BasketsModule } from './baskets/baskets.module';
import { BlogsModule } from './blogs/blogs.module';
import { FootersModule } from './footers/footers.module';
import { HeadersModule } from './headers/headers.module';
import { HerosModule } from './heros/heros.module';
import { PopularsModule } from './populars/populars.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { WeHelpsModule } from './we-helps/we-helps.module';
import { WhyChoosesModule } from './why-chooses/why-chooses.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BasketsModule,
    BlogsModule,
    FootersModule,
    HeadersModule,
    HerosModule,    
    PopularsModule,
    ProductsModule,
    TestimonialsModule,
    WeHelpsModule,
    WhyChoosesModule
  ],
  exports: [
    HeadersModule
  ]
})
export class ComponentsModule { }
