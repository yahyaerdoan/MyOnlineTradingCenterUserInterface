import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeadersModule } from '../headers/headers.module';
import { HerosModule } from '../heros/heros.module';
import { FootersModule } from '../footers/footers.module';
import { BasketsComponent } from './basket/baskets.component';



@NgModule({
  declarations: [
    BasketsComponent
  ],
  imports: [
    CommonModule,
    HeadersModule,
    HerosModule,
    FootersModule,
    RouterModule.forChild([
      {path: "baskets", component: BasketsComponent}
    ])
  ],
  exports:[
    BasketsComponent
  ]
})
export class BasketsModule { }
