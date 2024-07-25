import { MatDialogRef } from "@angular/material/dialog";

export class BaseDialogModel<DialogComponent> {
    constructor(public dialogRef: MatDialogRef<DialogComponent>){}

    closeDialog(){
        this.dialogRef.close();
    }
}
