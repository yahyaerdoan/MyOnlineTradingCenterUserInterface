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

  constructor(private alertfyService: AlertifyService, private signalRService: SignalRService){}

  ngOnInit(): void {
    this.startSignalRConnections();
    this.setupSignalRReceivers();
  }

  private startSignalRConnections(): void {
    this.signalRService.start(HubUrls.ProductsHub);
    this.signalRService.start(HubUrls.OrdersHub);
  }

  private setupSignalRReceivers(): void {
    
    this.signalRService.on(ReceivedFunctions.ReceivedProductAddedMessageFunction, message =>{
      this.alertfyService.message(message, {
      position: Position.BottomRight,
      messageType: MessageType.Info,     
      });     
    });

    this.signalRService.on(ReceivedFunctions.ReceivedOrderAddedMessageFunction, message =>{
      this.alertfyService.message(message, {
      position: Position.BottomRight,
      messageType: MessageType.Info,     
      });     
    });    
  };
}
