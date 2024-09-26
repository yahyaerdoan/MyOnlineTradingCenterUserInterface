import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from '../../../services/features/admin/services/alertify.service';
import { SignalRService } from '../../../services/core/services/signal-r.service';
import { ReceivedFunctions } from '../../../constants/received-functions';
import { HubUrls } from '../../../constants/hub-urls';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.scss'
})
export class DashboardsComponent implements OnInit {

  constructor(private alertfyService: AlertifyService, private signalRService: SignalRService){
    signalRService.start(HubUrls.ProductsHub)
  }
  ngOnInit(): void {
    debugger;
    this.signalRService.on(ReceivedFunctions.ReceivedProductAddedMessageFunction, message =>{
      this.alertfyService.message(message, {
      position: Position.BottomRight,
      messageType: MessageType.Info,     
      })
      console.log(message) 
    })
  }
}
