import { Component, OnInit, Output } from '@angular/core';
import { ProductService } from '../../../../services/core-services/feature-services/product.service';
import { BasesComponent, SpinnerType } from '../../../../bases/bases.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/interface-services/admin/services/alertify.service';
import { Router } from '@angular/router';
import { FileUploadOptions } from '../../../../services/shared-services/components/file-upload/file-upload.component';
import { CreateProductResponse } from '../../../../contracts/product/responses/create-product-response.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent extends BasesComponent implements OnInit {
  constructor(spinner: NgxSpinnerService, private productService: ProductService,
    private alertifyService: AlertifyService, private routerService: Router
  ) { super(spinner); }

  ngOnInit(): void {
  }

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action: "upload",
    controller: "products",
    explanation: "Choose your file",
    accept: '.png, .jpeg',
    isAdminPage: true
  }

  async onCreateProduct(name: HTMLInputElement, description: HTMLTextAreaElement,
    stock: HTMLInputElement, price: HTMLInputElement
  ) {
    const createProductRequest = {
      createProductDto: {
        name: name.value,
        description: description.value,
        stock: parseInt(stock.value, 10),
        price: parseFloat(price.value)
      }
    };

    this.showSpinner(SpinnerType.BallScaleMultiple);
    const result: CreateProductResponse = await this.productService.createProduct(createProductRequest);

    if (result.isSuccessful) {
      this.hideSpinner(SpinnerType.BallScaleMultiple);
      this.alertifyService.message(result.message, {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });

      this.routerService.navigate(['/admin-interface/products']);

    } else {
      this.hideSpinner(SpinnerType.BallScaleMultiple);

      const errorMessage = result.errors ? result.errors.join('. ') : 'Product creation failed.';

      this.alertifyService.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    }
  }; 
}
