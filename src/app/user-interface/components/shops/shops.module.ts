import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopsComponent } from './shops.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ShopsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component:ShopsComponent}
    ])
  ],
  exports: [ShopsComponent]
})
export class ShopsModule { }
