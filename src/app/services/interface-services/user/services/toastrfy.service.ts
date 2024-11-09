import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastrfyService {

  constructor(private toastr:  ToastrService) { }
  message(message: string, title: string, toastrOptions : Partial<ToastrOptions>){
    const messageType = toastrOptions.messageType || MessageType.Info; // Default to 'info' if not defined
    const positionClass = toastrOptions.position || Position.TopRight; // Default to 'toast-top-right' if not defined
    this.toastr[messageType](message, title, { positionClass });
  }

}

export enum MessageType{
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error",
}

export enum Position{
TopRight = "toast-top-right",
BottomRight = "toast-bottom-right",
BottomLeft = "toast-bottom-left",
TopLeft = "toast-top-left",
TopFullWidth = "toast-top-full-width",
BottomFullWidth = "toast-bottom-full-width",
TopCenter = "toast-top-center",
BottomCenter = "toast-bottom-center"
}

export class ToastrOptions{
  messageType?: MessageType
  position?: Position
}