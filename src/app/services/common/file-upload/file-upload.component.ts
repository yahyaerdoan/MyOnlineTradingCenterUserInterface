import { Component, Input, input, Output } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { HttpClientService } from '../http-client.service';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {
  AlertifyService,
  MessageType as AlertifyMessageType,
  Position as AlertifyPosition,
} from '../../admin/alertify.service';
import {
  ToastrfyService,
  MessageType as ToastrfyMessageType,
  Position as ToastrfyPosition,
} from '../../user-i/toastrfy.service';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private alertfyService: AlertifyService,
    private toastrfyService: ToastrfyService
  ) {}

  @Input() options!: Partial<FileUploadOptions>;
  public files!: NgxFileDropEntry[];

  public slectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();

    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.httpClientService
      .post(
        {
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ responseType: 'blob' }),
        },
        fileData
      )
      .subscribe({
        next: (data: any) => this.handleUploadSuccessMessage(),
        error: (errorResponse: HttpErrorResponse) =>
          this.handleUploadErrorMessage(),
        complete: () => {
          console.log('Upload process completed.');
        },
      });
  }

  private handleUploadSuccessMessage() {
    const successMessage: string = 'File uploaded.';

    if (this.options.isAdminPage) {
      this.alertfyService.message(successMessage, {
        dismissOthers: true,
        messageType: AlertifyMessageType.Success,
        position: AlertifyPosition.TopRight,
      });
    } else {
      this.toastrfyService.message(successMessage, 'Success', {
        messageType: ToastrfyMessageType.Success,
        position: ToastrfyPosition.TopRight,
      });
    }
  }

  private handleUploadErrorMessage() {
    const errorMessage: string = 'File not uploaded.';

    if (this.options.isAdminPage) {
      this.alertfyService.message(errorMessage, {
        dismissOthers: true,
        messageType: AlertifyMessageType.Error,
        position: AlertifyPosition.TopRight,
      });
    } else {
      this.toastrfyService.message(errorMessage, 'Error', {
        messageType: ToastrfyMessageType.Error,
        position: ToastrfyPosition.TopRight,
      });
    }
  }
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
