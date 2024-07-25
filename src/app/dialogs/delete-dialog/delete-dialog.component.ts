import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseDialogModel } from '../bases/base-dialog-model';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent extends BaseDialogModel<DeleteDialogComponent>{
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DeleteState,
    dialogRef: MatDialogRef<DeleteDialogComponent>) { super(dialogRef); }
}

export enum DeleteState {
 Yes = 'Yes', 
 No = 'No'
}