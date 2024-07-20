import { Component, OnInit } from '@angular/core';
import { CreateProduct } from '../../../../contracts/createproduct';
import { ProductService } from '../../../../services/common/models/product.service';
import { BasesComponent, SpinnerType } from '../../../../bases/bases.component';
import { NgxSpinnerService } from 'ngx-spinner';
import {
  AlertifyService,
  MessageType,
  Position,
} from '../../../../services/admin/alertify.service';
import { Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent extends BasesComponent implements OnInit {
  constructor(spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertify: AlertifyService,
    private router: Router
  ) {super(spinner);}

  ngOnInit(): void {
  }

  async createProduct(name: HTMLInputElement, description: HTMLTextAreaElement, stock: HTMLInputElement, price: HTMLInputElement) {

    const createProduct: CreateProduct = {
      Name: name.value,
      Description: description.value,
      Stock: parseInt(stock.value, 10),
      Price: parseFloat(price.value),
    };

    this.showSpinner(SpinnerType.BallScaleMultiple);

  await  this.productService.create(createProduct, () => {
      this.hideSpinner(SpinnerType.BallScaleMultiple);
      this.alertify.message('Product created.', {        
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight,
      });
      this.router.navigate(['/admin-interface/products']);
    });

    this.hideSpinner(SpinnerType.BallScaleMultiple);
    this.alertify.message('Product not created.', {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight,
    });
  }
}
