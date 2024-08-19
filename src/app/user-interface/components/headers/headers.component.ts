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

  logOut(){
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.router.navigate([""]);
    this.toastfyService.message("Log out succesfully!", "Log Out!",{
      messageType: MessageType.Info,
      position: Position.TopRight
    })
    
  }
}
