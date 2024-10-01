import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopsComponent } from './shops.component';
import { RouterModule } from '@angular/router';
import { HeadersModule } from '../headers/headers.module';
import { FootersModule } from '../footers/footers.module';
import { HerosModule } from '../heros/heros.module';



@NgModule({
  declarations: [
    ShopsComponent
  ],
  imports: [
    CommonModule,
    HeadersModule,
    HerosModule,
    FootersModule,
    RouterModule.forChild([
      {path: "shops", component:ShopsComponent},
      {path: "shops/:pageNo", component:ShopsComponent}
    ])
  ],
  exports: [ShopsComponent]
})
export class ShopsModule { }
