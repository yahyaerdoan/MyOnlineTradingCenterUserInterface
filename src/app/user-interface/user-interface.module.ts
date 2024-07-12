import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { HomesModule } from './components/homes/homes.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsModule,
    HomesModule
  ]
})
export class UserInterfaceModule { }
