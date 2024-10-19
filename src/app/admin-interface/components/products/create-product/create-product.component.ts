import { Component, OnInit, Output } from '@angular/core';
import { CreateProduct } from '../../../../contracts/products/createproduct';
import { ProductService } from '../../../../services/core/models/product.service';
import { BasesComponent, SpinnerType } from '../../../../bases/bases.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/features/admin/services/alertify.service';
import { Router } from '@angular/router';
import { FileUploadOptions } from '../../../../services/shared/components/file-upload/file-upload.component';
import { SignalRService } from '../../../../services/core/services/signal-r.service';
import { ReceivedFunctions } from '../../../../constants/received-functions';
import { HubUrls } from '../../../../constants/hub-urls';
import { CreateProductRequest } from '../../../../contracts/product/requests/create-product-request.model';
import { CreateProductResponse } from '../../../../contracts/product/responses/create-product-response.model';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent extends BasesComponent implements OnInit {
  constructor(spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertifyService: AlertifyService,
    private router: Router,
    private signalRService: SignalRService
  ) { super(spinner); signalRService.start(HubUrls.ProductsHub); }

  ngOnInit(): void {
    this.signalRService.on(ReceivedFunctions.ReceivedProductAddedMessageFunction, message => {
      this.alertifyService.message(message, {
        position: Position.BottomCenter,
        messageType: MessageType.Warning,
      })
      console.log(message)
    })

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
      //this.router.navigate(['/admin-interface/products']);
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

  //#region create Product old version
  /*   async onCreateProduct(name: HTMLInputElement, description: HTMLTextAreaElement, stock: HTMLInputElement, price: HTMLInputElement) {
  
      const createProduct: CreateProduct = {
        name: name.value,
        description: description.value,
        stock: parseInt(stock.value, 10),
        price: parseFloat(price.value),
      };
  
      this.showSpinner(SpinnerType.BallScaleMultiple);
  
      await this.productService.create(createProduct, () => {
        this.hideSpinner(SpinnerType.BallScaleMultiple);
        this.alertifyService.message('Product created.', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.TopRight,
        });
        //this.router.navigate(['/admin-interface/products']);
      });
  
      this.hideSpinner(SpinnerType.BallScaleMultiple);
      this.alertifyService.message('Product not created.', {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight,
      });
    } */
  //#endregion
}
