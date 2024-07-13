import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhyChoosesComponent } from './why-chooses.component';
import { RouterModule } from '@angular/router';



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
