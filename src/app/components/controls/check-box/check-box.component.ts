import { Component, HostBinding, Input, OnDestroy } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
@Component({
  selector: 'check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.scss']
})
export class CheckBoxComponent implements OnDestroy {
  @HostBinding('class') get class(): string {
    return this.field.columnClass;
  }

  public get field(): IFieldConfig {
    return this._internalField;
  }

  @Input()
  public set field(value: IFieldConfig) {
    this._internalField = value;
    this.isIndeterniate = value.value === null;
    this._oldValue = value.value;
    if (this._internalGroup) {
      this.updateControl();
    }
  }

  public get group(): UntypedFormGroup {
    return this._internalGroup;
  }

  @Input()
  public set group(value: UntypedFormGroup) {
    this._internalGroup = value;
    if (this._internalField) {
      this.updateControl();
    }
  }

  private _internalChange = false;
  private _internalField: IFieldConfig;
  private _internalGroup: UntypedFormGroup;
  private _oldValue: any;
  private _subscriptions: Subscription[];

  public control: AbstractControl;
  public isIndeterniate: boolean;

  public constructor() {
    this._subscriptions = [];
  }

  private updateControl() {
    this.control = this._internalGroup.get(this._internalField.key);
    this._subscriptions.push(this.control.valueChanges.subscribe(value => this.valueChanges(value)));
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
}
