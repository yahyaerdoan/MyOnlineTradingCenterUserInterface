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
  totalProductCount!: number;
  currentPageNo!: number;
  currentPageSize: number= 12;
  totalPageCount!: number;
  pageNumberList: number[] =[];

   getProducts() {
    this.activatedRouteService.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);
      const data: {totalProductCount: number, products: ListProduct[]} = await this.productService.read(
        this.currentPageNo -1, this.currentPageSize, () => {
        //successCallback
      }, () => {
        //errorCallback
      });
      this.products = data.products;
      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.currentPageSize);
      this.pageNumberList = [];
      
      if (this.currentPageNo -4 <= 0)
        for (let index = 1; index <= 9; index++)
          this.pageNumberList.push(index);

      else if(this.currentPageNo +4 >= this.totalPageCount)
        for (let index = this.totalPageCount -8; index <= this.totalPageCount; index++)
          this.pageNumberList.push(index);
        
      else
      for (let index = this.currentPageNo -4; index <= this.currentPageNo +4; index++)
        this.pageNumberList.push(index);
     

    });   
  }
}
