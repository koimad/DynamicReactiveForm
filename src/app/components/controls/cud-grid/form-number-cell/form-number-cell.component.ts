import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormArray } from '@angular/forms';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'form-number-cell',
  templateUrl: './form-number-cell.component.html',
  styleUrls: ['./form-number-cell.component.scss']
})
export class FormNumberCellComponent implements ICellRendererAngularComp {
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
  private value: number;
  public key: string;
  private formArrayKey: string;
  private rowIndex: number;

  agInit(params: ICellRendererParams<number>) {
    this.rootFormGroup = params.context.formGroup as UntypedFormGroup;
    this.formArrayKey = params.context.formArrayName;
    this.key = params.column.getColId();
    this.value = params.value;
    this.rowIndex = params.node.rowIndex;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  refresh(params: ICellRendererParams<number>): boolean {
    if (this.formGroup) {
      this.formGroup.controls[this.key].patchValue(this.value);
    }
    return true;
  }
}
