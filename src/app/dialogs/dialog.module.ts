import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AddProductImageDialogComponent } from './add-product-image-dialog/add-product-image-dialog.component';
import {MatCardModule} from '@angular/material/card';
import { FileUploadModule } from '../services/shared-services/components/file-upload/file-upload.module';
import { OrderDetailDialogComponent } from './order-detail-dialog/order-detail-dialog.component';
import { CompleteThisOrderDialogComponent } from './complete-this-order-dialog/complete-this-order-dialog.component';




@NgModule({
  declarations: [
    DeleteDialogComponent,
    AddProductImageDialogComponent, 
    OrderDetailDialogComponent, 
    CompleteThisOrderDialogComponent],
  imports: [
    CommonModule,
    MatDialogModule, MatButtonModule, MatCardModule,
    FileUploadModule
  ]
})
export class DialogModule { }
