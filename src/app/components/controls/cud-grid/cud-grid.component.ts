import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
import {
  Column,
  ColumnApi,
  GridApi,
  GridReadyEvent,
  RowNode,
} from 'ag-grid-community';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { FormBuilderExtended } from '../../my-form/FormBuilderExtended';
import { FormNumberCellComponent } from './form-number-cell/form-number-cell.component';
import { FormTextCellComponent } from './form-text-cell/form-text-cell.component';

@Component({
  selector: 'cud-grid',
  templateUrl: './cud-grid.component.html',
  styleUrls: ['./cud-grid.component.scss'],
})
export class CudGridComponent implements OnInit {
  private _api: GridApi;
  private _columnApi: ColumnApi;

  private _field: IFieldConfig;

  private _group: UntypedFormGroup;

  private _formArray: UntypedFormArray;
  private _fieldName: string;

  public rowSelection = 'single';

  public rows: any[];

  @Input()
  get field(): IFieldConfig {
    return this._field;
  }
  set field(value: IFieldConfig) {
    this._field = value;

    this.inputsChanged();
  }

  @Input()
  get group(): UntypedFormGroup {
    return this._group;
  }
  set group(value: UntypedFormGroup) {
    this._group = value;
    this.inputsChanged();
  }

  constructor(
    private formBuilder: FormBuilderExtended,
  ) { }

  ngOnInit() { }

  private inputsChanged() {
    if (this.field) {
      this.rows = [...this.field.value];
    }
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

  gridReady(params: GridReadyEvent) {
    this._api = params.api;
    this._columnApi = params.columnApi;

    this.refreshFormControls();
  }

  public onSelectionChanged() {
    // console.log(this.api.getSelectedRows());
  }

  private createFormControls() {
    const columns = this._columnApi.getAllColumns();

    if (this._fieldName) {
      this._group.removeControl(this._fieldName);
    }

    const rows = new Array<AbstractControl>();

    this._api.forEachNode((rowNode: RowNode) => {
      const rowGroup = this.formBuilder.group([]);

      columns.forEach((column: Column) => {
        rowGroup.addControl(
          column.getColDef().field,
          this.formBuilder.control(rowNode.data[column.getColDef().field])
        );
      });
      rows.push(rowGroup);
    });
    this._formArray = this.formBuilder.array(rows);
    this._fieldName = this.field.key;
    this._group.addControl(this._fieldName, this._formArray);
  }

  public getComponents() {
    return { text: FormTextCellComponent, number: FormNumberCellComponent };
  }

  public getContext() {
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

    this._api.updateRowData({ add: [newItem] });

    const formGroup = this.formBuilder.group([]);

    let i: 0;
    Object.keys(newItem).forEach((name) => {
      formGroup.addControl(name, this.formBuilder.control(Object.values[i++]));
    });

    this._formArray.push(formGroup);
  }

  public onRemove(): void {
    this._api.getSelectedNodes().forEach((n) => {
      this._formArray.removeAt(n.rowIndex);
    });
    this._api.removeItems(this._api.getSelectedNodes());
  }

  public onReset() {
    this.inputsChanged();
    this.createFormControls();
  }
}
