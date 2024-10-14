import { Injectable } from '@angular/core';
import { HttpClientService } from '../services/http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService: HttpClientService) { }

  getBasketItems(){
    
  }
}
