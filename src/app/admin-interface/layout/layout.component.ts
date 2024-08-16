import { Component, OnInit } from '@angular/core';
import { AlertifyService, MessageType, Position } from '../../services/features/admin/services/alertify.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit {

  constructor(private alertify: AlertifyService ){}
  ngOnInit(): void {
   /*  this.alertify.message("Hello", {
      messageType : MessageType.Success,
      delay : 5,
      position : Position.TopRight
    } ) */
  }
}
