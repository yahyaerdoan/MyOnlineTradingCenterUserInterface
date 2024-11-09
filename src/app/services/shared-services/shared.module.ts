import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDirective } from '../../directives/admin/delete.directive';


@NgModule({
  declarations: [DeleteDirective],
  imports: [
    CommonModule,   
  ],
   exports: [DeleteDirective]
})
export class SharedModule { }
