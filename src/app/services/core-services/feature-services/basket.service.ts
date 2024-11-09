import { Injectable } from '@angular/core';
import { HttpClientService } from '../general-services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService: HttpClientService) { }

  getBasketItems(){
    
  }
}
