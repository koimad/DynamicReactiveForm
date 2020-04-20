import { AbstractControl, FormArray } from '@angular/forms';
import {
  AbstractControlOptions,
  AsyncValidatorFn,
  ValidatorFn,
} from '@angular/forms';

export class FormArrayExtended extends FormArray {

  public get dirty(): boolean {
    let childControlsDirty = false;
    Object.keys(this.controls).forEach((key) => {
      childControlsDirty = childControlsDirty || this.controls[key].dirty;
    });
    if (!childControlsDirty) {
      childControlsDirty = !this.collectionsEqual();
    }
    return childControlsDirty;
  }

  public get originalValue(): any {
    return this._startCollection.values;
  }

  private _startCollection: AbstractControl[];

  constructor(
    controls: AbstractControl[],
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);

    this._startCollection = [...controls];
  }

  push(control: AbstractControl): void {
    super.push(control);
  }

  public insert(index: number, control: AbstractControl): void {
    super.insert(index, control);
  }

  public removeAt(index: number): void {
    super.removeAt(index);
  }

  public setControl(index: number, control: AbstractControl): void {
    super.setControl(index, control);
  }

  private collectionsEqual(): boolean {
    let result = this._startCollection.length === this.controls.length;

    if (result) {
      const t = [];
      this._startCollection.forEach((a) => {
        this.controls.forEach((b) => {
          if (a.value === b.value) {
            t.push(b);
          }
        });
      });
      result = t.length === this._startCollection.length;
    }

    return result;
  }
}
