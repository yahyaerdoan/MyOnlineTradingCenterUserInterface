import { Component, OnInit } from '@angular/core';
import { BasesComponent, SpinnerType } from '../../../../bases/bases.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClientService } from '../../../../services/core-services/general-services/http-client.service';

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
  }
}
