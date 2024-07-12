import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomesComponent } from './homes.component';
import { RouterModule } from '@angular/router';
import { HeadersModule } from '../headers/headers.module';



@NgModule({
  declarations: [
    HomesComponent,
  ],
  imports: [
    CommonModule,
    HeadersModule,    
    RouterModule.forChild([
      {path: "", component: HomesComponent}
    ]) 
  ],
  exports: [HomesComponent]
})
export class HomesModule { }
