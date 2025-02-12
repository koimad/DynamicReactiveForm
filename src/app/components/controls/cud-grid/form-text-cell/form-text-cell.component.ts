import { Component } from '@angular/core';

import { UntypedFormArray, UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';

import { ICellRendererAngularComp } from 'ag-grid-angular';

import { IAfterGuiAttachedParams, ICellRendererParams } from 'ag-grid-community';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'form-text-cell',
    templateUrl: './form-text-cell.component.html',
    styleUrls: ['./form-text-cell.component.scss'],
    imports: [ReactiveFormsModule, MatFormField, MatInput]
})
export class FormTextCellComponent implements ICellRendererAngularComp {
  private _rootFormGroup: UntypedFormGroup;

  private _value: string;

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

  public agInit(params: ICellRendererParams<string>) {
    this._rootFormGroup = params.context.formGroup as UntypedFormGroup;
    this._formArrayKey = params.context.formArrayName;
    this.key = params.column.getColId();
    this._value = params.value;
    this._rowIndex = params.node.rowIndex;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public refresh(params: ICellRendererParams<string>): boolean {
    if (this.formGroup) {
      this.formGroup.controls[this.key].patchValue(this._value);
    }
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  public afterGuiAttached?(params?: IAfterGuiAttachedParams): void {}
}

