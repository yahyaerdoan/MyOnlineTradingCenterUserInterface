import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WhyChoosesComponent } from './why-choose/why-chooses.component';



@NgModule({
  declarations: [
    WhyChoosesComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: WhyChoosesComponent
        
      }
    ])
  ],
  exports:[WhyChoosesComponent]
})
export class WhyChoosesModule { }
