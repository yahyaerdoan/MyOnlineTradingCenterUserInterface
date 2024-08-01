import { Component, Inject, Output } from '@angular/core';
import { BaseDialogModel } from '../bases/base-dialog-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FileUploadOptions } from '../../services/common/file-upload/file-upload.component';

@Component({
  selector: 'app-add-product-image-dialog',
  templateUrl: './add-product-image-dialog.component.html',
  styleUrl: './add-product-image-dialog.component.scss'
})
export class AddProductImageDialogComponent extends BaseDialogModel<AddProductImageDialogComponent> {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AddProductImageDialogState | string,
    dialogRef: MatDialogRef<AddProductImageDialogComponent>) { super(dialogRef); }

   @Output() options: Partial<FileUploadOptions> ={
      accept: '.png',
      action: 'upload',
      controller: 'products',
      explanation: "Select Product Image",
      isAdminPage: true,
      queryString:  `id=${this.data}`
    };

}
export enum AddProductImageDialogState {
  Yes = 'Yes', 
  No = 'No'
 }