import { Component } from '@angular/core';
import { MessageType, Position, ToastrfyService } from './services/user-i/toastrfy.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
    
})
export class AppComponent {
  title = 'MyOnlineTradingCenterUserInterface';
  constructor(private toastr:  ToastrfyService){
    //toastr.message("Have to be cereful", "Info",{messageType: MessageType.Success, position: Position.TopRight})
    }
}
