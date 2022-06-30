import { Component } from '@angular/core';
import { IAfterGuiAttachedParams } from 'ag-grid-community';
import { UntypedFormGroup, UntypedFormArray } from '@angular/forms';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'form-number-cell',
  templateUrl: './form-number-cell.component.html',
  styleUrls: ['./form-number-cell.component.scss']
})
export class FormNumberCellComponent implements ICellRendererAngularComp {
  get formGroup(): UntypedFormGroup {
    if (this.rootFormGroup && this.rootFormGroup.controls[this.formArrayKey]) {
      return (this.rootFormGroup.controls[this.formArrayKey] as UntypedFormArray)
        .controls[this.rowIndex] as UntypedFormGroup;
    } else {
      return undefined;
    }
  }

  private rootFormGroup: UntypedFormGroup;
  private value: any;
  public key: string;
  private formArrayKey: any;
  private rowIndex: number;

  agInit(params: any) {
    this.rootFormGroup = params.context.formGroup as UntypedFormGroup;
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
