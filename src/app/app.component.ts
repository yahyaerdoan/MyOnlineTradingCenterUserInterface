import { Component } from '@angular/core';
import { MessageType, Position, ToastrfyService } from './services/interface-services/user/services/toastrfy.service';
import { AuthService } from './services/core-services/general-services/auth.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
    
})
export class AppComponent {
  title = 'MyOnlineTradingCenterUserInterface';
  constructor(private toastr:  ToastrfyService, public authService: AuthService){
    //toastr.message("Have to be cereful", "Info",{messageType: MessageType.Success, position: Position.TopRight})
    authService.identityCheck();
    }
}
