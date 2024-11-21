import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HerosComponent } from './hero/heros.component';



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
