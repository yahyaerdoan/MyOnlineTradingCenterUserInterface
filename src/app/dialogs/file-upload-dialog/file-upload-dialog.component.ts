import { Component, Inject } from '@angular/core';
import { BaseDialogModel } from '../bases/base-dialog-model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-upload-dialog',
  templateUrl: './file-upload-dialog.component.html',
  styleUrl: './file-upload-dialog.component.scss'
})
export class FileUploadDialogComponent extends BaseDialogModel<FileUploadDialogComponent> {

  constructor(@Inject(MAT_DIALOG_DATA) public data: FileUploadState, 
  dialogRef: MatDialogRef<FileUploadDialogComponent>){ super(dialogRef) }
}
export enum FileUploadState {
  Yes = 'Yes', 
  No = 'No'
 }