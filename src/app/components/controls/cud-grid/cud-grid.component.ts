import { Component, Input } from '@angular/core';

import {
  AbstractControl,
  TouchedChangeEvent,
  UntypedFormArray,
  UntypedFormGroup,
  ReactiveFormsModule
} from '@angular/forms';

import { Column, GridApi, GridReadyEvent, RowNode } from 'ag-grid-community';

import { IFieldConfig } from 'src/app/model/IFieldConfig';

import { FormBuilderExtended } from '../../my-form/FormBuilderExtended';

import { FormNumberCellComponent } from './form-number-cell/form-number-cell.component';

import { FormTextCellComponent } from './form-text-cell/form-text-cell.component';
import { NgClass } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { FormGroupExtended } from '../../my-form/FormGroupExtended';

@Component({
  selector: 'cud-grid',
  templateUrl: './cud-grid.component.html',
  styleUrls: ['./cud-grid.component.scss'],
  imports: [NgClass, ReactiveFormsModule, AgGridAngular]
})
export class CudGridComponent {
  private _api: GridApi;

  private _field: IFieldConfig;

  private _group: UntypedFormGroup;

  private _formArray: UntypedFormArray;

  private _fieldName: string;

  private _initialValue: any;

  public rowSelection = { mode: 'singleRow', checkboxes: false, enableClickSelection: true };

  public rows: any[];

  public constructor(private formBuilder: FormBuilderExtended) {}

  private inputsChanged() {
    if (this.field && Array.isArray(this.field.value)) {
      this.rows = [...(this.field.value as [])];
    }
  }

  private createFormControls() {
    const columns = this._api.getColumns();

    this._fieldName = this._field.key;

    const controlNames = Object.keys(this._group.controls);

    controlNames.forEach(controlName => {
      this._group.removeControl(controlName);
    });

    const rows = new Array<AbstractControl>();

    this._api.forEachNode((rowNode: RowNode) => {
      const rowGroup = this.formBuilder.group([]);
      columns.forEach((column: Column) => {
        rowGroup.addControl(column.getColDef().field, this.formBuilder.control(rowNode.data[column.getColDef().field]));
      });

      rows.push(rowGroup);
    });

    this._formArray = this.formBuilder.array(rows);

    this._formArray.events.subscribe(f => {
      if (f instanceof TouchedChangeEvent && !f.touched) {
        this.onReset();
      }
    });

    this._group.addControl(this._fieldName, this._formArray, { emitEvent: false });

    (this._group as FormGroupExtended).entityType = this._field.entityType;

    this._initialValue = this._formArray.value;
  }

  @Input()
  public get field(): IFieldConfig {
    return this._field;
  }

  public set field(value: IFieldConfig) {
    this._field = value;

    this.inputsChanged();
  }

  @Input()
  public get group(): UntypedFormGroup {
    return this._group;
  }

  public set group(value: UntypedFormGroup) {
    this._group = value;

    this.inputsChanged();
  }

  public refreshFormControls() {
    if (this._api) {
      // slight chicken and egg here - the grid cells will be created before the grid is ready, but
      // we need set formGroup up front
      // as such we'll create the grid (and cells) and force refresh the cells
      // Cell Component will then set the form in the refresh, completing the loop
      // this is only necessary once, on initialisation

      this.createFormControls();

      this._api.refreshCells({ force: true });
    }
  }

  public gridReady(params: GridReadyEvent) {
    this._api = params.api;

    this.refreshFormControls();
  }

  public onSelectionChanged() {
    console.debug(this._api.getSelectedRows());
  }

  public getComponents() {
    return { text: FormTextCellComponent, number: FormNumberCellComponent };
  }

  public getContext() {
    return {
      formGroup: this.group,
      formArrayName: this.field.key
    };
  }

  public getRowId(data: any) {
    // optional here - ag-Grid will create row ids if you don't supply one, but
    // if you have a way of uniquely identifying rows here's where you'd do it.
    // doing so would make it easier to pull out specific rows from the form,
    // say by order number, as we do here
    return data.Id;
  }

  public onAdd(): void {
    const newItem = {
      Id: 0,

      FirstName: '',

      MiddleName: '',

      Age: undefined
    };

    this._api.applyTransaction({ add: [newItem] });

    const formGroup = this.formBuilder.group([]);

    let i: 0;

    Object.keys(newItem).forEach(name => {
      const control = this.formBuilder.control(Object.values[i++]);

      formGroup.addControl(name, control);
    });

    this._formArray.push(formGroup);
  }

  public onRemove(): void {
    this._api.getSelectedNodes().forEach(n => {
      this._formArray.removeAt(n.rowIndex);
    });

    this._api.applyTransaction({ remove: [this._api.getSelectedNodes()] });
  }

  public onReset() {
    this.inputsChanged();
    this.createFormControls();
  }
}

