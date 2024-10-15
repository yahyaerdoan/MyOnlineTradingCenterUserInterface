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
import { HomesModule } from './homes/homes.module';
import { RegistersModule } from './registers/registers.module';
import { LogInsModule } from './log-ins/log-ins.module';
import { ShopsModule } from './shops/shops.module';
import { AboutUsModule } from './about-us/about-us.module';



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
    WhyChoosesModule,
    HomesModule,
    RegistersModule,
    LogInsModule,
    ShopsModule,
    AboutUsModule
  ]
})
export class ComponentsModule { }
