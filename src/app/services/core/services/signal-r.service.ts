import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';


// npm i @microsoft/signalr
// npm i @types/signalr

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private _hubConnection! : HubConnection;

  constructor(@Inject("signalRBaseUrl") private signalRBaseUrl: string) { }

  get connection(): HubConnection{
    return this._hubConnection;
  }

  start(hubUrl: string){
    const fullHubUrl = `${this.signalRBaseUrl}/${hubUrl}`;
    if (!this.connection || this._hubConnection?.state == HubConnectionState.Disconnected) {
      const builder : HubConnectionBuilder = new HubConnectionBuilder();
      const hubConnection : HubConnection = builder.withUrl(fullHubUrl)
      .withAutomaticReconnect().build();

      hubConnection.start()
      .then(() =>{console.log("Hub Connected");})
      .catch(error => setTimeout(() => this.start(fullHubUrl), 2000));  
      this._hubConnection = hubConnection;    
    }
    this._hubConnection.onreconnected(connectionId => console.log("Hub Reconnected"));
    this._hubConnection.onreconnecting(error => console.log("Hub Reconnecting"));
    this._hubConnection.onclose(error => console.log("Closed Hub Reconnection"));
  }

  invoke(procedureMethodName: string, message: any, successCallBack?: (value: unknown) => void,  
  errorCallBack?: (value: unknown) => void ){
    this.connection.invoke(procedureMethodName, message)
    .then(successCallBack).catch(errorCallBack);
  }

  on(procedureMethodName: string, callBack: (...message: any[]) => void){
    this.connection.on(procedureMethodName, callBack);
  }
}
