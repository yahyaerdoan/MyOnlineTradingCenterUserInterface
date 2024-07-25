import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxFileDropModule } from 'ngx-file-drop';
import { DialogModule } from '../dialog.module';


@NgModule({
  declarations: [
    FileUploadModule
  ],
  imports: [
    CommonModule,
    NgxFileDropModule,
    DialogModule
  ],
  exports:[
    FileUploadModule
  ]
})
export class FileUploadModule { }
