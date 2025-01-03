import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BasesComponent, SpinnerType } from '../../../../bases/bases.component';
import { CreateBasketItem } from '../../../../contracts/basketItems/create-basket-item';
import { ListProduct } from '../../../../contracts/products/listproduct';
import { BasketItemService } from '../../../../services/core-services/feature-services/basket-item.service';
import { ProductService } from '../../../../services/core-services/feature-services/product.service';
import { MessageType, Position, ToastrfyService } from '../../../../services/interface-services/user/services/toastrfy.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.scss'
})
export class ShopsComponent extends BasesComponent implements OnInit {

  constructor(private productService: ProductService, private activatedRouteService: ActivatedRoute,
    private basketItemService: BasketItemService, private spinnerService: NgxSpinnerService,
    private toastfyService: ToastrfyService
  ) { super(spinnerService) }

  ngOnInit(): void {
    this.getProducts();
  }

  products!: ListProduct[];
  totalProductCount!: number;
  currentPageNo: number = 1;
  currentPageSize: number = 12;
  totalPageCount!: number;
  pageNumberList: number[] = [];

  getProducts() {
    this.activatedRouteService.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);

      const data: { totalProductCount: number, products: ListProduct[] } = await this.productService.read(
        this.currentPageNo - 1,
        this.currentPageSize,
        () => { /* successCallback */ },
        () => { /* errorCallback */ }
      );
      console.log("products and images", data.products);
      this.products = data.products.map(product => {
        const imagePath = product.imageFiles.length
          ? product.imageFiles.find(image => image.showcasePicture)?.path || "" : "";
        return { ...product, imagePath }
      });
      console.log("Mapped products with imagePath", this.products);
      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.currentPageSize);
      this.pageNumberList = [];

      // Static Page 1 is always shown, but exclude it from the dynamic range.
      // Don't add Page 1 to dynamic list to avoid duplication.

      // Pagination logic starts from Page 2.
      if (this.currentPageNo - 4 <= 0) {
        // If current page is close to the beginning, show pages from 2 to 8 (if available)
        for (let index = 2; index <= Math.min(9, this.totalPageCount - 1); index++) {
          this.pageNumberList.push(index);
        }
      } else if (this.currentPageNo + 4 >= this.totalPageCount) {
        // If current page is near the end, show pages ending at the last page.
        for (let index = Math.max(2, this.totalPageCount - 8); index < this.totalPageCount; index++) {
          this.pageNumberList.push(index);
        }
      } else {
        // In the middle, dynamically calculate pages around the current page, excluding Page 1 and the last page.
        for (let index = this.currentPageNo - 4; index <= this.currentPageNo + 4; index++) {
          if (index > 1 && index < this.totalPageCount) {
            this.pageNumberList.push(index);
          }
        }
      }
    });
  }

  async addToBasket(product: ListProduct) {
    this.spinnerService.show(SpinnerType.BallScaleMultiple);

    const basketItem: CreateBasketItem = {
      productId: product.id,
      quantity: 1
    };

    await this.basketItemService.addBasketItem(basketItem);

    this.spinnerService.hide(SpinnerType.BallScaleMultiple);

    this.toastfyService.message("Product added to cart.", "Added to Cart!", {
      messageType: MessageType.Success,
      position: Position.TopRight
    });

    console.log(basketItem);
  };

}
