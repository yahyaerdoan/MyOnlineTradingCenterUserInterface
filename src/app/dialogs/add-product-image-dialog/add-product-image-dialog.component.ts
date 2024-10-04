import { Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialogModel } from '../bases/base-dialog-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/core/models/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../bases/bases.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ListProductImage } from '../../contracts/products/listproductimage';
import { DialogService } from '../../services/shared/services/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
import { FileUploadOptions } from '../../services/shared/components/file-upload/file-upload.component';

@Component({
  selector: 'app-add-product-image-dialog',
  templateUrl: './add-product-image-dialog.component.html',
  styleUrl: './add-product-image-dialog.component.scss',
  animations: [
    trigger('fadeOut', [
      state('in', style({ opacity: 1 })),
      transition('* => void', [
        animate('500ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class AddProductImageDialogComponent extends BaseDialogModel<AddProductImageDialogComponent> implements OnInit{

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddProductImageDialogState | string,
    private productService: ProductService,
    private spinnerService: NgxSpinnerService,
    private dialogService: DialogService,
    dialogRef: MatDialogRef<AddProductImageDialogComponent>) { super(dialogRef); }

    @Output() options: Partial<FileUploadOptions> ={
      accept: '.png',
      action: 'upload',
      controller: 'products',
      explanation: "Select Product Image",
      isAdminPage: true,
      queryString:  `id=${this.data}`
    };
    images: ListProductImage[] =[];

  async ngOnInit(): Promise<void> {
    this.spinnerService.show(SpinnerType.BallScaleMultiple)
    this.images = await this.productService.readImages(this.data as string, ()=> this.spinnerService.hide(SpinnerType.BallScaleMultiple))
    console.log(this.images)
    const imada = this.images
    console.log(imada)

  }

 async deleteImage(imageId: string ){
  this.dialogService.openDialog({
    componentType: DeleteDialogComponent,
    data: DeleteState.Yes,
    afterClosed: async () =>{
      this.spinnerService.show(SpinnerType.BallScaleMultiple)
      await this.productService.deleteImage(this.data as string, imageId, ()=> this.spinnerService.hide(SpinnerType.BallScaleMultiple))
      this.images = this.images.filter(image => image.id !== imageId);      
    },
   })  
  }

  showCase(imageId: string){
    //alert("ImageId: " + imageId + "- ProductId" + this.data)
    this.spinnerService.show(SpinnerType.BallScaleMultiple);
    this.productService.updateImageShowcase(imageId, this.data, () => {
      this.spinnerService.hide(SpinnerType.BallScaleMultiple);
      //console.log(this.data)
    })
  }








  
}
export enum AddProductImageDialogState {
  Yes = 'Yes', 
  No = 'No'
 }