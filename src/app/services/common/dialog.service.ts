import { Injectable } from '@angular/core';
import { DialogPosition, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(dialogParameters: Partial<DialogParameters>): void {
    if (dialogParameters.componentType) {
      const dialogRef = this.dialog.open(dialogParameters.componentType, {
        panelClass: dialogParameters.options?.panelClass,
        width: dialogParameters.options?.width,
        height: dialogParameters.options?.height,
        position: dialogParameters.options?.position,
        data: dialogParameters.data,
      });

      dialogRef.afterClosed().subscribe((result) => {
        if (result === dialogParameters.data && dialogParameters.afterClosed) {
          dialogParameters.afterClosed();
        }
      });
    } else {
      console.error('Dialog component type is required');
    }
  }
}

export class DialogParameters {
  componentType!: ComponentType<any>;
  data?: any;
  afterClosed?: () => void;
  options?: Partial<DialogOptions>;
}

export class DialogOptions {
  panelClass!: 'custom-dialog-container';
  width?: string = '250px';
  height?: string = '250px';
  position?: DialogPosition;
}
