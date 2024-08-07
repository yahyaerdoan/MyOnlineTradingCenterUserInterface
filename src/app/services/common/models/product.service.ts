import { Injectable } from '@angular/core';
import { HttpClientService } from '../http-client.service';
import { CreateProduct } from '../../../contracts/createproduct';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProduct } from '../../../contracts/listproduct';
import { firstValueFrom, Observable } from 'rxjs';
import { ListProductImage } from '../../../contracts/listproductimage';

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
    page: number = 0, 
    size: number = 5, 
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{totalDataCount: number; products: ListProduct[]}> {
    const promisData: Promise<{totalDataCount: number; products: ListProduct[]}> = firstValueFrom(
      this.httpClientService.get<{totalDataCount: number; products: ListProduct[]}>({
        controller: 'products',
        queryString: `page=${page}&size=${size}`
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

 async delete(id: string){
  const deleteProduct =this.httpClientService.delete({
      controller: "products"
    }, id)
    await firstValueFrom(deleteProduct)
  }

 async readImages(id: string, successCallBack?: ()=> void, errorCallBack?: (error: string) => void): Promise<ListProductImage[]>{
   const getObservable: Observable<ListProductImage[]> =  this.httpClientService.get<ListProductImage[]>({
      controller: "products",
      action: "getImages"
    }, id);
    const promiseData = firstValueFrom(getObservable)
    .then((data) => {
      if (successCallBack) successCallBack();
      return data;
    })
    .catch((errorResponse: HttpErrorResponse) => {
      if (errorCallBack) errorCallBack(errorResponse.message);
      throw errorResponse;
    });
    return await promiseData;
  }

 async deleteImage(id: string, imageId: string, successCallBack?: ()=> void, errorCallBack?: (error: string) => void){
    const deleteObservable = this.httpClientService.delete({
      controller:'products',
      action:'deleteimage',
      queryString:  `imageId=${imageId}`
    }, id);

    const promiseData = firstValueFrom(deleteObservable)
    .then((data) => {
      if (successCallBack) successCallBack();
      return data;
    })
    .catch((errorResponse: HttpErrorResponse) => {
      if (errorCallBack) errorCallBack(errorResponse.message);
      throw errorResponse;
    });    
    return await promiseData;
  }
}
