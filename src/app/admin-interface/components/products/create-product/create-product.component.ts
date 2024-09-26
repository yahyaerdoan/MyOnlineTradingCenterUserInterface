import { Component, OnInit, Output } from '@angular/core';
import { CreateProduct } from '../../../../contracts/products/createproduct';
import { ProductService } from '../../../../services/core/models/product.service';
import { BasesComponent, SpinnerType } from '../../../../bases/bases.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService,  MessageType,  Position } from '../../../../services/features/admin/services/alertify.service';
import { Router } from '@angular/router';
import { FileUploadOptions } from '../../../../services/shared/components/file-upload/file-upload.component';
import { SignalRService } from '../../../../services/core/services/signal-r.service';
import { ReceivedFunctions } from '../../../../constants/received-functions';
import { HubUrls } from '../../../../constants/hub-urls';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.scss',
})
export class CreateProductComponent extends BasesComponent implements OnInit {
  constructor(spinner: NgxSpinnerService,
    private productService: ProductService,
    private alertfyService: AlertifyService,
    private router: Router,
    private signalRService: SignalRService
  ) {super(spinner); signalRService.start(HubUrls.ProductsHub);}

  ngOnInit(): void {
    this.signalRService.on(ReceivedFunctions.ReceivedProductAddedMessageFunction, message =>{
      this.alertfyService.message(message, {
      position: Position.BottomCenter,
      messageType: MessageType.Warning,     
      })
      console.log(message)
    })
    
  }

  @Output() fileUploadOptions: Partial<FileUploadOptions> = {
    action : "upload",
    controller: "products",
    explanation: "Choose your file",
    accept : '.png, .jpeg',
    isAdminPage: true
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
      this.alertfyService.message('Product created.', {        
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight,
      });
      //this.router.navigate(['/admin-interface/products']);
    });

    this.hideSpinner(SpinnerType.BallScaleMultiple);
    this.alertfyService.message('Product not created.', {
      dismissOthers: true,
      messageType: MessageType.Error,
      position: Position.TopRight,
    });
  }
}
