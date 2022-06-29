import { Component, Inject, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'display-value-changed',
  templateUrl: './display-value-changed.component.html',
  styleUrls: ['./display-value-changed.component.scss']
})

export class DisplayValueChangedComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DisplayValueChangedComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }
  onYesClick(): void {
    this.dialogRef.close(true);
  }
}


export interface DialogData {
  oldValue: any;
  newValue: any;
  label: string;
}
