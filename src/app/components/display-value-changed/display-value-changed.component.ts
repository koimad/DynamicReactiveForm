import { Component, Inject } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from './DialogData';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'display-value-changed',
  templateUrl: './display-value-changed.component.html',
  styleUrls: ['./display-value-changed.component.scss'],
  imports: [MatButton]
})
export class DisplayValueChangedComponent {
  public constructor(
    public dialogRef: MatDialogRef<DisplayValueChangedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  public onNoClick(): void {
    this.dialogRef.close(false);
  }

  public onYesClick(): void {
    this.dialogRef.close(true);
  }
}

