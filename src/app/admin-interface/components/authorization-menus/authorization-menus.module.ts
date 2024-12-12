import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationMenuComponent } from './authorization-menu/authorization-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [AuthorizationMenuComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AuthorizationMenuComponent },
    ]),
  ],
})
export class AuthorizationMenusModule {}
