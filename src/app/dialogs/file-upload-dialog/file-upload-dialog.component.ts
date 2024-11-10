import { Component, Inject } from '@angular/core';
import { BaseDialogModel } from '../base-dialog/base-dialog-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.scss'
})
export class FileUploadDialogComponent extends BaseDialogModel<FileUploadDialogComponent> {

  constructor(@Inject(MAT_DIALOG_DATA) public data: FileUploadDialogState,
    dialogRef: MatDialogRef<FileUploadDialogComponent>) { super(dialogRef) }
}
export enum FileUploadDialogState {
  Yes = 'Yes',
  No = 'No'
}