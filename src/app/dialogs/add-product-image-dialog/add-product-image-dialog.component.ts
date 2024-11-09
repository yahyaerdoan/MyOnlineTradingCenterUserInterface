import { ChangeDetectorRef, Component, Inject, OnInit, Output } from '@angular/core';
import { BaseDialogModel } from '../bases/base-dialog-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/core-services/feature-services/product.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../bases/bases.component';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { ListProductImage } from '../../contracts/products/listproductimage';
import { DialogService } from '../../services/shared-services/services/dialog.service';
import { DeleteDialogComponent, DeleteState } from '../delete-dialog/delete-dialog.component';
import { FileUploadOptions } from '../../services/shared-services/components/file-upload/file-upload.component';

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
    private cd: ChangeDetectorRef,
    dialogRef: MatDialogRef<AddProductImageDialogComponent>) { super(dialogRef); }

    @Output() options: Partial<FileUploadOptions> ={
      accept: '.png',
      action: 'upload',
      controller: 'products',
      explanation: "Select Product Image",
      isAdminPage: true,
      queryString:  `id=${this.data}`
    };
    images: ListProductImage[] = [];

    ngOnInit(): void {
      this.getAllProductImages();
    }
  
    async getAllProductImages(): Promise<void> {
      this.spinnerService.show(SpinnerType.BallScaleMultiple);
      this.images = await this.productService.readImages(this.data as string, () => {      
        this.spinnerService.hide(SpinnerType.BallScaleMultiple);
      });
      console.log("getAllProductImages",this.images);
      //this.cd.detectChanges();
    }
  
    async updateShowcasePicture(selectedImage: ListProductImage): Promise<void> {
      this.spinnerService.show(SpinnerType.BallScaleMultiple);      
      await this.productService.updateImageShowcase(selectedImage.id, this.data, () => {        
        this.images.forEach(image => {
          // Set the selected image to true, and all others to false
          image.showcasePicture = (image.id === selectedImage.id);
        });  
        this.spinnerService.hide(SpinnerType.BallScaleMultiple);
        //this.cd.detectChanges();
      });
      console.log("updateShowcasePicture",this.images);
    }

    async deleteImage(imageId: string): Promise<void> {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () =>{
        this.spinnerService.show(SpinnerType.BallScaleMultiple)
        await this.productService.deleteImage(this.data as string, imageId, 
          ()=> this.spinnerService.hide(SpinnerType.BallScaleMultiple))
        this.images = this.images.filter(image => image.id !== imageId);      
      },
     })  
    } 
}
export enum AddProductImageDialogState {
  Yes = 'Yes', 
  No = 'No'
 }