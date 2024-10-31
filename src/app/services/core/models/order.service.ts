import { Injectable } from '@angular/core';
import { HttpClientService } from '../services/http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateOrderRequest } from '../../../contracts/order/requests/create-order-request.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClientService: HttpClientService) { }
  
  async createOrder(createOrder: CreateOrderRequest) {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "orders"
    }, createOrder);
    await firstValueFrom(observable);
  };
}
