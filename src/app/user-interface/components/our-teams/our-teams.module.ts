import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurTeamsComponent } from './our-teams.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [OurTeamsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: "", component: OurTeamsComponent}])
  ],
  exports:[OurTeamsComponent]
})
export class OurTeamsModule { }
