import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from '../../../services/features/admin/services/alertify.service';
import { SignalRService } from '../../../services/core/services/signal-r.service';

@Component({
  selector: 'app-dashboards',
  templateUrl: './dashboards.component.html',
  styleUrl: './dashboards.component.scss'
})
export class DashboardsComponent implements OnInit {

  constructor(private alertfyService: AlertifyService, private signalRService: SignalRService){
    signalRService.start("https://localhost:7241/products-hub")
  }
  ngOnInit(): void {
    this.signalRService.on("ReceivedProductAddedMessage", message =>{
      this.alertfyService.message(message, {
      position: Position.BottomRight,
      messageType: MessageType.Info
      })
    })
  }
}
