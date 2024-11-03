import { Component } from '@angular/core';

import { UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { IAfterGuiAttachedParams, ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'form-text-cell',
  templateUrl: './form-text-cell.component.html',
  styleUrls: ['./form-text-cell.component.scss']
})
export class FormTextCellComponent implements ICellRendererAngularComp {
  get formGroup(): UntypedFormGroup {
    if (this.rootFormGroup && this.rootFormGroup.controls[this.formArrayKey]) {
      return (this.rootFormGroup.controls[this.formArrayKey] as UntypedFormArray).controls[
        this.rowIndex
      ] as UntypedFormGroup;
    } else {
      return undefined;
    }
  }

  private rootFormGroup: UntypedFormGroup;
  private value: string;
  public key: string;
  private formArrayKey: string;
  private rowIndex: number;

  agInit(params: ICellRendererParams<string>) {
    this.rootFormGroup = params.context.formGroup as UntypedFormGroup;
    this.formArrayKey = params.context.formArrayName;
    this.key = params.column.getColId();
    this.value = params.value;
    this.rowIndex = params.node.rowIndex;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  refresh(params: ICellRendererParams<string>): boolean {
    if (this.formGroup) {
      this.formGroup.controls[this.key].patchValue(this.value);
    }
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {}
}

