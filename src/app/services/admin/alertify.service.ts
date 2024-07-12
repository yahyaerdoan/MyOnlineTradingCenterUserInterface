import { Injectable } from '@angular/core';
declare var alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  //message(message: string, messageType: MessageType, position: Position, delay = 3, dismissOthers: boolean = false)
  message(message: string, options: Partial<AlertifyOptions> = {}) {
    if (options.position) {
      alertify.set('notifier', 'position', options.position);
    }
    if (options.delay) {
      alertify.set('notifier', 'delay', options.delay);
    }
    const messageType = options.messageType || MessageType.Info;
    const onemessage = alertify[messageType](message)
    if (options.dismissOthers) {
      onemessage.dismissOthers();
    }
  }

  dismiss() {
    alertify.dismissAll()
  }
}
export class AlertifyOptions {
  messageType?: MessageType = MessageType.Info; // Example: default value
  position?: Position = Position.TopRight; // Example: default value
  delay?: number = 5000;
  dismissOthers?: boolean = false;
}
export enum MessageType {
  Error = "error",
  Message = "message",
  Notify = "notify",
  Success = "success",
  Warning = "warning",
  Info = "info"
}
export enum Position {
  TopCenter = "top-center",
  TopRight = "top-right",
  TopLeft = "top-left",
  BottomCenter = "bottom-center",
  BottomRight = "bottom-right",
  BottomLeft = "bottom-left"
}