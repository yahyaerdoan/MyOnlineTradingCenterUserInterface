import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';


// npm i @microsoft/signalr
// npm i @types/signalr

@Injectable({
  providedIn: 'root'
})
export class SignalRService {
  private connections: Map<string, HubConnection> = new Map();

  constructor(@Inject("signalRBaseUrl") private signalRBaseUrl: string) { }

  private ensureConnection(hubUrl: string): HubConnection {
    if (!this.connections.has(hubUrl)) {
      const fullHubUrl = `${this.signalRBaseUrl}/${hubUrl}`;
      const connection = new HubConnectionBuilder()
        .withUrl(fullHubUrl)
        .withAutomaticReconnect()
        .build();

      connection.start()
        .then(() => console.log("Hub Connected: " + hubUrl))
        .catch(error => console.error("Connection failed: " + hubUrl, error));

      connection.onreconnected(connectionId => console.log("Hub Reconnected: " + hubUrl));
      connection.onreconnecting(error => console.log("Hub Reconnecting: " + hubUrl));
      connection.onclose(error => console.log("Hub Connection Closed: " + hubUrl));

      this.connections.set(hubUrl, connection);
    }
    return this.connections.get(hubUrl)!;
  }

  invoke(hubUrl: string, procedureMethodName: string, message: any, 
    successCallBack?: (value: unknown) => void, errorCallBack?: (value: unknown) => void) {
    const connection = this.ensureConnection(hubUrl);
    connection.invoke(procedureMethodName, message)
      .then(successCallBack)
      .catch(errorCallBack);
  }

  on(hubUrl: string, procedureMethodName: string, callBack: (...message: any) => void) {
    const connection = this.ensureConnection(hubUrl);
    connection.on(procedureMethodName, (...messages: any) => callBack(...messages));
  }
}
