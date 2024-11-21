import { NgModule } from "@angular/core";
import { HomesComponent } from "./home/homes.component";
import { CommonModule } from "@angular/common";
import { HeadersModule } from "../headers/headers.module";
import { HerosModule } from "../heros/heros.module";
import { WhyChoosesModule } from "../why-chooses/why-chooses.module";
import { WeHelpsModule } from "../we-helps/we-helps.module";
import { PopularsModule } from "../populars/populars.module";
import { TestimonialsModule } from "../testimonials/testimonials.module";
import { BlogsModule } from "../blogs/blogs.module";
import { FootersModule } from "../footers/footers.module";
import { RouterModule } from "@angular/router";
import { ProductsModule } from "../products/products.module";




@NgModule({
  declarations: [
    HomesComponent,
  ],
  imports: [
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
