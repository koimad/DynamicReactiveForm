import { Component, OnInit, Input } from '@angular/core';
import { ErrorStateMatcher } from '@angular/material';
import { ComponentErrorMapper } from '../component-error-mapper';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { FieldConfig } from 'src/app/model/form-item-definition';
import { FormBuilderExtended } from '../../my-form/FormBuilderExtended';

@Component({
  selector: 'cud-grid',
  templateUrl: './cud-grid.component.html',
  styleUrls: ['./cud-grid.component.css']
})
export class CudGridComponent implements OnInit {
  formBuilder: FormBuilderExtended;
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

  constructor() {
    this.errorMapper = new ComponentErrorMapper();
    this.formBuilder = new FormBuilderExtended();
  }
  errorMapper: ErrorStateMatcher;

  // tslint:disable-next-line:variable-name
  _field: FieldConfig;
  // tslint:disable-next-line:variable-name
  _group: FormGroup;

  public formArray: FormArray;

  ngOnInit() {
    this.setupForm();
  }

  inputsChanged() {
    this.setupForm();
  }

  public setupForm() {
    if (this._group && this.field) {
      this._group.removeControl('formArray');

      const rows = new Array<AbstractControl>();

      if (this._group && this._field) {
        this._field.value.forEach(element => {
          const formGroup = this.formBuilder.group({
            name: element.name,
            description: element.description,
            price: element.price
          });
          rows.push(formGroup);
        });
      }
      this.formArray = this.formBuilder.array(rows);
      this._group.addControl('formArray', this.formArray);
    }
  }

  public onAdd(): void {
    const formGroup = this.formBuilder.group({
      name: '',
      description: '',
      price: ''
    });
    this.formArray.push(formGroup);
  }

  public onRemove(): void {
    this.formArray.removeAt(this.formArray.length - 1);
  }

  public onReset() {
    this.formArray.reset();
    this.setupForm();
  }
}
