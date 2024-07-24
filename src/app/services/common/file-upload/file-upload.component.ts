import { Component, Input, input, Output } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AlertifyService } from '../../admin/alertify.service';
import { ToastrfyService, MessageType, Position } from '../../user-i/toastrfy.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})


export class FileUploadComponent {
  constructor(private httpClientService: HttpClientService, private alertfyService: AlertifyService, private toastrfyService: ToastrfyService){}

  @Input() options!: Partial<FileUploadOptions>
  public files!: NgxFileDropEntry[];

  public slectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.httpClientService.post({
      controller: this.options.controller,
      action: this.options.action,
      queryString: this.options.queryString,
      headers: new HttpHeaders({"responseType": "blob"})

    }, fileData).subscribe(data => {

      const successMessage: string = "File uploaded."

      if (this.options.isAdminPage) {
        this.alertfyService.message(successMessage)       
      } else {
        this.toastrfyService.message(successMessage, "Success",{
          messageType: MessageType.Success,
          position: Position.BottomCenter
        })        
      }

    }, (errorResponse: HttpErrorResponse) => {

      const errorMessage: string = "File not uploaded."

      if (this.options.isAdminPage) {
        this.alertfyService.message(errorMessage, {})       
      } else {
        this.toastrfyService.message(errorMessage, "Error", {})        
      }

    });
  }
}

export class FileUploadOptions{
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}