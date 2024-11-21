import { Component, OnInit } from '@angular/core';
import { HubUrls } from '../../../../constants/hub-urls';
import { ReceivedFunctions } from '../../../../constants/received-functions';
import { SignalRService } from '../../../../services/core-services/general-services/signal-r.service';
import { AlertifyService, MessageType, Position } from '../../../../services/interface-services/admin/services/alertify.service';


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
