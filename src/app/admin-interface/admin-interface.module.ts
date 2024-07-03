import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { ComponentsModule } from './layout/components/components.module';
import { LayoutModule } from './layout/layout.module';



@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule, ComponentsModule, LayoutModule
  ],exports :[LayoutModule]
})
export class AdminInterfaceModule { }
