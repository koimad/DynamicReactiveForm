import { Component } from '@angular/core';

import {
  FormArray,
  AbstractControl,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams } from 'ag-grid-community';

@Component({
  selector: 'form-text-cell',
  templateUrl: './form-text-cell.component.html',
  styleUrls: ['./form-text-cell.component.scss'],
})
export class FormTextCellComponent implements ICellRendererAngularComp {
  get formGroup(): FormGroup {
    if (this.rootFormGroup && this.rootFormGroup.controls[this.formArrayKey]) {
      return (this.rootFormGroup.controls[this.formArrayKey] as FormArray)
        .controls[this.rowIndex] as FormGroup;
    } else {
      return undefined;
    }
  }

  private rootFormGroup: FormGroup;
  private value: any;
  public key: string;
  private formArrayKey: any;
  private rowIndex: number;

  agInit(params: any) {    
    this.rootFormGroup = params.context.formGroup as FormGroup;
    this.formArrayKey = params.context.formArrayName;
    this.key = params.column.colId;
    this.value = params.value;
    this.rowIndex = params.rowIndex;    
  }

  refresh(params: any): boolean {
     if (this.formGroup) {
       this.formGroup.controls[this.key].patchValue(this.value);
     }
    return true;
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {}
}
