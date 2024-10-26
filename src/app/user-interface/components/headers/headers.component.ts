import { Component } from '@angular/core';
import { AuthService } from '../../../services/core/services/auth.service';
import { MessageType, Position, ToastrfyService } from '../../../services/features/user/services/toastrfy.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrl: './headers.component.scss'
})
export class HeadersComponent {

  constructor(public authService: AuthService, private toastfyService:  ToastrfyService, private router: Router) { }

  logOut(): void {
    this.authService.logOut(); // Call the logout method in the AuthService to clear session
    this.router.navigate([""]);
    this.toastfyService.message("Logged out successfully!", "Log Out!", {
      messageType: MessageType.Info,
      position: Position.TopRight
    });
  }
  
}
