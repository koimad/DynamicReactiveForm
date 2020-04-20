import { Component, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IFieldConfig } from 'src/app/model/IFieldConfig';

@Component({
  selector: 'check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnInit, OnDestroy {

  @HostBinding('class') get class(): string { return this.field.columnClass };

  public get field(): IFieldConfig {
    return this._internalField;
  }

  @Input('field')
  public set field(value: IFieldConfig) {
    this._internalField = value;
    this.isIndeterniate = value.value === null;
    this._oldValue = value.value;
    if (this._internalGroup) {
      this.updateControl();
    }
  }

  public get group(): FormGroup {
    return this._internalGroup;
  }

  @Input('group')
  public set group(value: FormGroup) {
    this._internalGroup = value;
    if (this._internalField) {
      this.updateControl();
    }
  }

  private _internalChange = false;
  private _internalField: IFieldConfig;
  private _internalGroup: FormGroup;
  private _oldValue: any;
  private _subscriptions: Array<Subscription>;

  public control: AbstractControl;
  public isIndeterniate: boolean;

  public constructor() {
    this._subscriptions = [];
  }

  private updateControl() {
    this.control = this._internalGroup.get(this._internalField.key);
    this._subscriptions.push(this.control.valueChanges.subscribe((value) => this.valueChanges(value)));
  }

  private valueChanges(newValue: any): void {

    if (this._internalChange === false) {
      this._internalChange = true;
      this.isIndeterniate = false;

      let nextValueIndex = this._internalField.options.indexOf(this._oldValue) + 1;

      if (nextValueIndex >= this._internalField.options.length) {
        nextValueIndex = 0;
      }

      newValue = this._internalField.options[nextValueIndex];

      this.control.setValue(newValue);
      this.isIndeterniate = newValue === null;
      this._internalChange = false;
      this._oldValue = newValue;

    }
  }

  public ngOnDestroy(): void {
    this._subscriptions.forEach(s => s.unsubscribe());

  }

  public ngOnInit() { }

}
