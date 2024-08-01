import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogModule } from '../../../dialogs/dialog.module';
import { FileUploadDialogComponent } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';




@NgModule({
  declarations: [
    FileUploadComponent,
    FileUploadDialogComponent
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    MatFormFieldModule,
    
    MatDialogModule,
    MatButtonModule,

    //Cancelled this import
    //DialogModule
  ],
  exports:[
    FileUploadComponent
  ]
})
export class FileUploadModule { }
