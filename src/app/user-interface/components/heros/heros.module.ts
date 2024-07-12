import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HerosComponent } from './heros.component';



@NgModule({
  declarations: [
    HerosComponent
  ],
  imports: [
    CommonModule
  ],
 exports: [HerosComponent]
})
export class HerosModule { }
