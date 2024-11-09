import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { FileUploadDialogComponent } from './file-upload-dialog/file-upload-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddProductImageDialogComponent } from './add-product-image-dialog/add-product-image-dialog.component';
import {MatCardModule} from '@angular/material/card';
import { FileUploadModule } from '../services/shared-services/components/file-upload/file-upload.module';




@NgModule({
  declarations: [
    DeleteDialogComponent, 
    //Cancelled this declaration
    //FileUploadDialogComponent, 
    AddProductImageDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule, MatCardModule,
    FileUploadModule
  ]
})
export class DialogModule { }
