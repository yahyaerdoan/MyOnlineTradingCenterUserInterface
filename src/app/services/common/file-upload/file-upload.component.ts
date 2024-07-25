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
import { FileUploadDialogComponent, FileUploadDialogState } from '../../../dialogs/file-upload-dialog/file-upload-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from '../dialog.service';
@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.scss',
})
export class FileUploadComponent {
  constructor(
    private httpClientService: HttpClientService,
    private alertfyService: AlertifyService,
    private toastrfyService: ToastrfyService,
    //private dialog: MatDialog,
    private dialogService: DialogService    
  ) {}

  @Input() options!: Partial<FileUploadOptions>;
  public files!: NgxFileDropEntry[];

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();

    for (const file of files) {
      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath);
      });
    }

    this.dialogService.openDialog( {
      componentType: FileUploadDialogComponent,
      data: FileUploadDialogState.Yes,
      afterClosed : ()=>{
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
    })
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

/*   openDialog(afterClosed: any): void {
    const dialogRef = this.dialog.open(FileUploadDialogComponent, {
     panelClass: 'custom-dialog-container',
      data: FileUploadState.Yes,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === FileUploadState.Yes) afterClosed();
    });
  } */
}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
