import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerosComponent } from './heros.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HerosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: HerosComponent}
    ])
  ],
 exports: [HerosComponent]
})
export class HerosModule { }
