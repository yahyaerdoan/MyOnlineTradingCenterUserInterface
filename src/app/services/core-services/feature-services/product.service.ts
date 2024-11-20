import { Injectable } from '@angular/core';
import { HttpClientService } from '../general-services/http-client.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ListProduct } from '../../../contracts/products/listproduct';
import { firstValueFrom, Observable } from 'rxjs';
import { ListProductImage } from '../../../contracts/products/listproductimage';
import { CreateProductRequest } from '../../../contracts/product/requests/create-product-request.model';
import { CreateProductResponse } from '../../../contracts/product/responses/create-product-response.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private httpClientService: HttpClientService) { }

  async createProduct(createProductDto: CreateProductRequest,
    successCallBack?: (message?: string) => void,
    errorCallBack?: (errorMessage?: string) => void): Promise<CreateProductResponse> {

    const observable: Observable<CreateProductResponse | CreateProductRequest> = this.httpClientService
      .post<CreateProductResponse | CreateProductRequest>({ controller: 'products' }, createProductDto);

    const result = await firstValueFrom(observable) as CreateProductResponse;

    if (result.isSuccessful) {
      successCallBack?.();
    } else {
      errorCallBack?.(this.formatErrorMessage(result.errors));
    }

    return result;
  }; private formatErrorMessage(errors?: string[] | undefined): string | undefined {
    return errors?.join('. ') || 'An unexpected error occured.'
  };

  async read(page: number = 0,size: number = 5,
    successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalProductCount: number; products: ListProduct[] }> {
    const promisData: Promise<{ totalProductCount: number; products: ListProduct[] }> = firstValueFrom(
      this.httpClientService.get<{ totalProductCount: number; products: ListProduct[] }>({
        controller: 'products',
        queryString: `page=${page}&size=${size}`
      })
    );

    promisData.then((data) => {
      if (successCallBack) successCallBack();
    }).catch((errorResponse: HttpErrorResponse) => {
      if (errorCallBack) errorCallBack(errorResponse.message);
    });
    return await promisData;
  };

  async delete(id: string) {
    const deleteProduct = this.httpClientService.delete({
      controller: "products"
    }, id)
    await firstValueFrom(deleteProduct)
  };

  async readImages(id: string, successCallBack?: () => void, errorCallBack?: (error: string) => void): Promise<ListProductImage[]> {
    const getObservable: Observable<ListProductImage[]> = this.httpClientService.get<ListProductImage[]>({
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
  };

  async deleteImage(id: string, imageId: string, successCallBack?: () => void, errorCallBack?: (error: string) => void) {
    const deleteObservable = this.httpClientService.delete({
      controller: 'products',
      action: 'deleteimage',
      queryString: `imageId=${imageId}`
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
  };

  async updateImageShowcase(imageId: string, productId: string, successCallback?: () => void): Promise<void> {
    const updateImageShowcaseObserbable = this.httpClientService.get({
      controller: "products",
      action: "updateimageshowcase",
      queryString: `imageId=${imageId}&productId=${productId}`
    });

    await firstValueFrom(updateImageShowcaseObserbable);
    successCallback?.();
  }; 
}
