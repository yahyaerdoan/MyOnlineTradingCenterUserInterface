import { Injectable } from '@angular/core';
import { HttpClientService } from '../general-services/http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateOrderRequest } from '../../../contracts/order/requests/create-order-request.model';
import { OrderListResponse } from '../../../contracts/order/responses/order-list-response.model';
import { OrderDetailResponse } from '../../../contracts/order/responses/order-detail-response.model';
import { CompleteOrderRequest } from '../../../contracts/order/requests/complete-order-request.model';
import { UpdateOrderStatusRequest } from '../../../contracts/order/requests/update-order-status-request.model';

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

  async getOrderDetailById(id: string, successCallback?: (successMessage: string) => void,
    errorCallback?: (errorMessage: string) => void): Promise<OrderDetailResponse> {
    const response: OrderDetailResponse = await firstValueFrom(this.httpClientService.get<OrderDetailResponse>({
      controller: 'orders',
      action: 'getbyidorderdetail'
    }, id));

    if (response.isSuccessful) {
      if (successCallback) successCallback(response.statusMessage);
      return response;
    } else {
      if (errorCallback) errorCallback(response.statusMessage);
      return response;
    }
  };

  async completeThisOrder(orderId: CompleteOrderRequest){

    const observable: Observable<any> = this.httpClientService.post({
      controller: 'completedorders',
    }, orderId);
    
    await firstValueFrom(observable);   
  };

 async updateOrderStatus(orderId:  UpdateOrderStatusRequest){

    const observable: Observable<any> = this.httpClientService.put({
      controller: 'orders'
    }, orderId);
     await firstValueFrom(observable);
  };

};
