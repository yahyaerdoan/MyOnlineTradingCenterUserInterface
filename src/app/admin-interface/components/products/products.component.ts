import { Component, OnInit } from '@angular/core';
import { BasesComponent, SpinnerType } from '../../../bases/bases.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent extends BasesComponent implements OnInit {

  constructor(spinner: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinner)
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallScaleMultiple)
    this.httpClientService.get({
      controller: "products"
    }).subscribe(data => console.log(data));

    /*  this.httpClientService.post({
       controller: "products"
     },{
       Name: "New Pc",
       Description: "new pc",
       Stock: "23",
       Price: "45",
     }).subscribe(); */

/*     this.httpClientService.put({
      controller: "products"
    }, {
      id: "5d1c37e4-aeb8-474f-be9f-af74600c0bf9",
      Name: "New Pcccccccccccccccccccccccccccccc",
      Description: "new pccccccccccccccccccccccccccc",
      Stock: "23",
      Price: "45",
    }).subscribe(); */

    this.httpClientService.delete({
      controller: "products"
    }, "5d1c37e4-aeb8-474f-be9f-af74600c0bf9").subscribe();
  }
}
