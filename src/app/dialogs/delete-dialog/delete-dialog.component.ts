import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.scss'
})
export class DeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public any: {data: string}) { }

  readonly dialogRef = inject(MatDialogRef<DeleteDialogComponent>);
  readonly data = inject<DeleteState>(MAT_DIALOG_DATA);
  
  closeDialog(): void {
    this.dialogRef.close();
  }
}

export enum DeleteState {
 Yes = 'Yes', 
 No = 'No'
}