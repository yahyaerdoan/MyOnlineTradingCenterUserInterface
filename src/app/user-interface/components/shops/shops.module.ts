import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopsComponent } from './shops.component';
import { RouterModule } from '@angular/router';
import { HeadersModule } from '../headers/headers.module';
import { FootersModule } from '../footers/footers.module';



@NgModule({
  declarations: [
    ShopsComponent
  ],
  imports: [
    CommonModule,
    HeadersModule,
    FootersModule,
    RouterModule.forChild([
      {path: "shops", component:ShopsComponent}
    ])
  ],
  exports: [ShopsComponent]
})
export class ShopsModule { }
