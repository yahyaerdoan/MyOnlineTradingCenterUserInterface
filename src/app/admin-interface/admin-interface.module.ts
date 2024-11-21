import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layouts/components/layout/layout.module';
import { ComponentsModule } from './components/components.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    LayoutModule,
    ComponentsModule

  ],
  exports:[
    LayoutModule 
  ]
})
export class AdminInterfaceModule { }
