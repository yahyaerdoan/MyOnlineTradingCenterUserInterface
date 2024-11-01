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

  constructor(private alertfyService: AlertifyService, private signalRService: SignalRService) { }

  ngOnInit(): void {

    this.signalRService.on(HubUrls.ProductsHub, ReceivedFunctions.ReceivedProductAddedMessageFunction, message => {
      this.alertfyService.message(message, {
        position: Position.TopCenter,
        messageType: MessageType.Success,
      });
    });

    this.signalRService.on(HubUrls.OrdersHub, ReceivedFunctions.ReceivedOrderAddedMessageFunction, message => {
      this.alertfyService.message(message, {
        position: Position.TopCenter,
        messageType: MessageType.Success,
      });
    });

  }
}
