import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export type MasterConfirmationDialogObject = {
  title: string;
  message: string;
  additionalDetails?: string;
  confirmButtonText: string;
  denyButtonText: string;
};

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
})
export class MasterConfirmationDialog {
  title: string = 'Please confirm';
  message: string = 'Are you sure?';
  additionalDetails: string = '';
  confirmButtonText: string = 'Yes';
  denyButtonText: string = 'No';
  constructor(
    public dialogRef: MatDialogRef<MasterConfirmationDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MasterConfirmationDialogObject
  ) {
    this.title = data.title ? data.title : this.title;
    this.message = data.message ? data.message : this.message;
    this.additionalDetails = data.additionalDetails
      ? data.additionalDetails
      : this.additionalDetails;
    this.confirmButtonText = data.confirmButtonText
      ? data.confirmButtonText
      : this.confirmButtonText;
    this.denyButtonText = data.denyButtonText
      ? data.denyButtonText
      : this.denyButtonText;
  }
}
