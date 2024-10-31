import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './DialogData';

@Component({
  selector: 'display-value-changed',
  templateUrl: './display-value-changed.component.html',
  styleUrls: ['./display-value-changed.component.scss']
})
export class DisplayValueChangedComponent {
  constructor(public dialogRef: MatDialogRef<DisplayValueChangedComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
