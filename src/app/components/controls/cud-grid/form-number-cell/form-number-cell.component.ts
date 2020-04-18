import { Component } from '@angular/core';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import { FormGroup, FormArray } from '@angular/forms';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'form-number-cell',
  templateUrl: './form-number-cell.component.html',
  styleUrls: ['./form-number-cell.component.css']
})
export class FormNumberCellComponent implements ICellRendererAngularComp {
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

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void { }
}
