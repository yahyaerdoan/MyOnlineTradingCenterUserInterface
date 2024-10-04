import { Injectable } from '@angular/core';
import { HttpClientService } from '../services/http-client.service';
import { CreateProduct } from '../../../contracts/products/createproduct';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProduct } from '../../../contracts/products/listproduct';
import { firstValueFrom, Observable } from 'rxjs';
import { ListProductImage } from '../../../contracts/products/listproductimage';

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
  ): Promise<{totalProductCount: number; products: ListProduct[]}> {
    const promisData: Promise<{totalProductCount: number; products: ListProduct[]}> = firstValueFrom(
      this.httpClientService.get<{totalProductCount: number; products: ListProduct[]}>({
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



 async updateImageShowcase(imageId: string, productId: string, successCallback?: () => void): Promise<void> {
    const updateImageShowcaseObserbable = this.httpClientService.get({
      controller: "products",
      action: "updateimageshowcase",
      queryString:  `imageId=${imageId}&productId=${productId}`
    });

    await firstValueFrom(updateImageShowcaseObserbable);
    successCallback?.();

  }




}
