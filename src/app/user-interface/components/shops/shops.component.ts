import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/core/models/product.service';
import { ListProduct } from '../../../contracts/products/listproduct';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.scss'
})
export class ShopsComponent implements OnInit {

  constructor(private productService: ProductService, private activatedRouteService: ActivatedRoute) { }
  ngOnInit(): void {
    this.getProducts();
  }

  products!: ListProduct[];
  currentPageNo!: number;

   getProducts() {
    this.activatedRouteService.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);
      const data: {totalProductCount: number, products: ListProduct[]} = await this.productService.read(this.currentPageNo -1, 12, () => {
        //successCallback
      }, () => {
        //errorCallback
      });
      this.products = data.products;

    });   
  }
}
