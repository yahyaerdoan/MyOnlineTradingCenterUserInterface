import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/core/models/product.service';
import { ListProduct } from '../../../contracts/products/listproduct';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrl: './shops.component.scss'
})
export class ShopsComponent implements OnInit {

  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.getProducts();
  }

  products!: ListProduct[];

  async getProducts() {
    const data: {totalProductCount: number, products: ListProduct[]} = await this.productService.read(0, 12, () => {
      //successCallback
    }, () => {
      //errorCallback
    });
    this.products = data.products;
  }
}
