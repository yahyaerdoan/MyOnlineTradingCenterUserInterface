import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { OurTeamsComponent } from './our-team/our-teams.component';



@NgModule({
  declarations: [OurTeamsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: "", component: OurTeamsComponent}])
  ],
  exports:[OurTeamsComponent]
})
export class OurTeamsModule { }
