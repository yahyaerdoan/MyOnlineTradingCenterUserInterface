import { Injectable } from '@angular/core';
import { HttpClientService } from '../services/http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateOrderRequest } from '../../../contracts/order/requests/create-order-request.model';
import { OrderListResponse } from '../../../contracts/order/responses/order-list-response.model';
import { data } from 'jquery';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderListResult } from '../../../contracts/order/models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClientService: HttpClientService) { }

  async createOrder(createOrder: CreateOrderRequest) {
    const observable: Observable<any> = this.httpClientService.post(
      { controller: 'orders' }, createOrder
    );
    await firstValueFrom(observable);
  };

  async getOrders(page: number = 0, size: number = 5, successCallback?: (successMessage: string) => void,
    errorCallback?: (errorMessage: string) => void): Promise<OrderListResponse> {
      console.log(page)
    const response: OrderListResponse = await firstValueFrom(
      this.httpClientService.get<OrderListResponse>({
        controller: 'orders',
        queryString: `page=${page}&size=${size}`        
      })
    );
  
    if (response.isSuccessful) {
      if (successCallback) successCallback(response.statusMessage);
      return response;
    } else {
      if (errorCallback) errorCallback(response.statusMessage);
      return response;
    }
  };



};

