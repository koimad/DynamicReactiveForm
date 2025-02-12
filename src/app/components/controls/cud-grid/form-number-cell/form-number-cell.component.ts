import { Component } from '@angular/core';
import { UntypedFormGroup, UntypedFormArray, ReactiveFormsModule } from '@angular/forms';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'form-number-cell',
    templateUrl: './form-number-cell.component.html',
    styleUrls: ['./form-number-cell.component.scss'],
    imports: [ReactiveFormsModule, MatFormField, MatInput]
})
export class FormNumberCellComponent implements ICellRendererAngularComp {
  private _rootFormGroup: UntypedFormGroup;

  private _value: number;

  private _formArrayKey: string;

  private _rowIndex: number;

  public key: string;

  public get formGroup(): UntypedFormGroup {
    if (this._rootFormGroup && this._rootFormGroup.controls[this._formArrayKey]) {
      return (this._rootFormGroup.controls[this._formArrayKey] as UntypedFormArray).controls[
        this._rowIndex
      ] as UntypedFormGroup;
    } else {
      return undefined;
    }
  }

  public agInit(params: ICellRendererParams<number>) {
    this._rootFormGroup = params.context.formGroup as UntypedFormGroup;
    this._formArrayKey = params.context.formArrayName;
    this.key = params.column.getColId();
    this._value = params.value;
    this._rowIndex = params.node.rowIndex;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public refresh(params: ICellRendererParams<number>): boolean {
    if (this.formGroup) {
      this.formGroup.controls[this.key].patchValue(this._value);
    }
    return true;
  }
}
