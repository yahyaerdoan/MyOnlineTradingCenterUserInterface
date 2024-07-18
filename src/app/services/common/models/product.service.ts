import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from '../../../contracts/createproduct';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProduct } from '../../../contracts/listproduct';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}
  async create(
    product: CreateProduct,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage?: string) => void
  ): Promise<void> {
    firstValueFrom(
      this.httpClientService.post({ controller: 'products' }, product)
    )
      .then(() => {
        if (successCallBack) {
          successCallBack();
        }
      })
      .catch((errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string; value: Array<string> }> =
          errorResponse.error;
        let message = '';
        _error.forEach((values) => {
          values.value.forEach((_value) => {
            message += `${_value}<br>`;
          });
        });
        if (errorCallBack) {
          errorCallBack(message);
        }
      });
  }

  async read(
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<ListProduct[]> {
    const promisData: Promise<ListProduct[]> = firstValueFrom(
      this.httpClientService.get<ListProduct[]>({
        controller: 'products',
      })
    );

    promisData
      .then((data) => {
        if (successCallBack) successCallBack();
      })
      .catch((errorResponse: HttpErrorResponse) => {
        if (errorCallBack) errorCallBack(errorResponse.message);
      });

    return await promisData;
  }
}
