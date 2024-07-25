import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogModule } from '../../../dialogs/dialog.module';




@NgModule({
  declarations: [
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    MatFormFieldModule,
    DialogModule
  ],
  exports:[
    FileUploadComponent
  ]
})
export class FileUploadModule { }
