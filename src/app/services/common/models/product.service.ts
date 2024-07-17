import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from '../../../contracts/createproduct';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProduct } from '../../../contracts/listproduct';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }
  create(product: CreateProduct, succesCallBack?: any,  errorCallBack?: (errorMessage?: string) => void ){
    this.httpClientService.post({
      controller: "products"
    }, product).subscribe(result => {
      succesCallBack();
    }, (errorResponse: HttpErrorResponse) => {
      const _error: Array<{key: string, value: Array<string>}> = errorResponse.error;
      let message = "";
      _error.forEach((values, index) => {
        values.value.forEach((_value, _index) => {
          message += `${_value}<br>`;
        })
      })
    });
  }

  async read(successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<ListProduct[]> {
    const promisData: Promise<ListProduct[]> = firstValueFrom(
      this.httpClientService.get<ListProduct[]>({
        controller: 'products'
      })
    );
    
    promisData
      .then(d => {
        if (successCallBack) successCallBack();
      })
      .catch((errorResponse: HttpErrorResponse) => {
        if (errorCallBack) errorCallBack(errorResponse.message);
      });

    return promisData;
  }
}
