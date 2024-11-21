import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogsComponent } from './blog/blogs.component';



@NgModule({
  declarations: [
    BlogsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: "", component: BlogsComponent}
    ])
  ],
  exports:[BlogsComponent]
})
export class BlogsModule { }
