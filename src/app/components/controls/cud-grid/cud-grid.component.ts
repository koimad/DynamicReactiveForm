import { Component, OnInit, Input } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material/core';
import { ComponentErrorMapper } from '../component-error-mapper';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { FieldConfig } from 'src/app/model/form-item-definition';
import { FormBuilderExtended } from '../../my-form/FormBuilderExtended';
import {
  GridApi,
  ColumnApi,
  GridReadyEvent,
  RowNode,
  Column,
} from 'ag-grid-community';

import { FormTextCellComponent } from './form-text-cell/form-text-cell.component';

@Component({
  selector: 'cud-grid',
  templateUrl: './cud-grid.component.html',
  styleUrls: ['./cud-grid.component.css'],
})
export class CudGridComponent implements OnInit {
  private api: GridApi;
  private columnApi: ColumnApi;

  // tslint:disable-next-line:variable-name
  _field: FieldConfig;
  // tslint:disable-next-line:variable-name
  _group: FormGroup;

  private formArray: FormArray;
  private fieldName: string;

  public rowSelection = 'single';

  public rows: any[];

  @Input()
  get field(): FieldConfig {
    return this._field;
  }
  set field(value: FieldConfig) {
    this._field = value;

    this.inputsChanged();
  }

  @Input()
  get group(): FormGroup {
    return this._group;
  }
  set group(value: FormGroup) {
    this._group = value;
    this.inputsChanged();
  }

  constructor(
    private formBuilder: FormBuilderExtended,
    private errorMapper: ComponentErrorMapper
  ) {}

  ngOnInit() {}

  inputsChanged() {
    if (this.field) {
      this.rows = [...this.field.value];
    }
  }

  public refreshFormControls() {
    if (this.api) {
      // slight chicken and egg here - the grid cells will be created before the grid is ready, but
      // we need set formGroup up front
      // as such we'll create the grid (and cells) and force refresh the cells
      // Cell Component will then set the form in the refresh, completing the loop
      // this is only necessary once, on initialisation
      this.createFormControls();
      this.api.refreshCells({ force: true });
    }
  }

  gridReady(params: GridReadyEvent) {
    this.api = params.api;
    this.columnApi = params.columnApi;

    this.refreshFormControls();
  }

  onSelectionChanged() {
    // console.log(this.api.getSelectedRows());
  }

  private createFormControls() {
    const columns = this.columnApi.getAllColumns();

    if (this.fieldName) {
      this._group.removeControl(this.fieldName);
    }

    const rows = new Array<AbstractControl>();

    this.api.forEachNode((rowNode: RowNode) => {
      const rowGroup = this.formBuilder.group([]);

      columns.forEach((column: Column) => {
        rowGroup.addControl(
          column.getColDef().field,
          this.formBuilder.control(rowNode.data[column.getColDef().field])
        );
      });
      rows.push(rowGroup);
    });
    this.formArray = this.formBuilder.array(rows);
    this.fieldName = this.field.key;
    this._group.addControl(this.fieldName, this.formArray);
  }

  getComponents() {
    return { formTextCell: FormTextCellComponent };
  }

  getContext() {
    return {
      formGroup: this.group,
      formArrayName: this.field.key,
    };
  }

  public onAdd(): void {
    const newItem = {
      firstName: '',
      middleName: '',
      age: undefined,
    };

    this.api.updateRowData({ add: [newItem] });

    const formGroup = this.formBuilder.group([]);

    let i: 0;
    Object.keys(newItem).forEach((name) => {
      formGroup.addControl(name, this.formBuilder.control(Object.values[i++]));
    });

    this.formArray.push(formGroup);
  }

  public onRemove(): void {
    this.api.getSelectedNodes().forEach((n) => {
      this.formArray.removeAt(n.rowIndex);
    });
    this.api.removeItems(this.api.getSelectedNodes());
    console.log(this.field.value);
  }

  public onReset() {
    this.inputsChanged();
    this.createFormControls();
  }
}
