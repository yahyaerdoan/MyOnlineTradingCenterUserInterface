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
  currentPageNo: number = 1;
  currentPageSize: number= 12;
  totalPageCount!: number;
  pageNumberList: number[] =[];

  getProducts() {
    this.activatedRouteService.params.subscribe(async params => {
      this.currentPageNo = parseInt(params["pageNo"] ?? 1);
  
      const data: { totalProductCount: number, products: ListProduct[] } = await this.productService.read(
        this.currentPageNo - 1, 
        this.currentPageSize, 
        () => { /* successCallback */ }, 
        () => { /* errorCallback */ }
      );
  
      this.products = data.products;
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
      // this code updated 
     /*  if (this.currentPageNo -4 <= 0)
        for (let index = 2; index <= Math.min(9, this.totalPageCount); index++)
          this.pageNumberList.push(index);

      else if(this.currentPageNo +4 >= this.totalPageCount)
        for (let index = Math.max(2, this.totalPageCount -8); index < this.totalPageCount; index++)
          this.pageNumberList.push(index);
        
      else
      for (let index = this.currentPageNo -4; index <= this.currentPageNo +4; index++)
        if(index > 1 && index < this.totalPageCount)
          this.pageNumberList.push(index);    */

    });
  }
  
}