import { Injectable, OnInit } from '@angular/core';
import { HttpClientService } from '../general-services/http-client.service';
import { firstValueFrom, Observable } from 'rxjs';
import { ListBasketItem } from '../../../contracts/basketItems/list-basket-item';
import { CreateBasketItem } from '../../../contracts/basketItems/create-basket-item';
import { UpdateBasketItem } from '../../../contracts/basketItems/update-basket-item';
import { DeleteBasketItem } from '../../../contracts/basketItems/delete-basket-item';

@Injectable({
  providedIn: 'root'
})
export class BasketItemService {

  constructor(private httpClientService: HttpClientService) { }

  async getBasketItems(): Promise<ListBasketItem[]> {
    const observable: Observable<ListBasketItem[]> = this.httpClientService.get({
      controller: "BasketItems"
    });

    return await firstValueFrom(observable);
  };

  async addBasketItem(basketItem: CreateBasketItem): Promise<void> {
    const observable: Observable<any> = this.httpClientService.post({
      controller: "BasketItems"
    }, basketItem);

    return await firstValueFrom(observable);
  };

  async updateBasketItemQuantity(basketItem: UpdateBasketItem): Promise<void> {
    const observable: Observable<any> = this.httpClientService.put({
      controller: "BasketItems"
    }, basketItem);

    return await firstValueFrom(observable);
  };

  async deleteBasketItem(basketItem: DeleteBasketItem): Promise<void> {
    const observable: Observable<any> = this.httpClientService.delete({
      controller: "BasketItems",
    }, basketItem.basketItemId);

    return await firstValueFrom(observable);
  };

}
