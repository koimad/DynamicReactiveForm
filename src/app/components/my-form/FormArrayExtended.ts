import { AbstractControl, FormArray } from '@angular/forms';
import {
  ValidatorFn,
  AbstractControlOptions,
  AsyncValidatorFn,
} from '@angular/forms';

export class FormArrayExtended extends FormArray {
  get dirty(): boolean {
    let childControlsDirty = false;
    Object.keys(this.controls).forEach((key) => {
      childControlsDirty = childControlsDirty || this.controls[key].dirty;
    });
    if (!childControlsDirty) {
      childControlsDirty = !this.collectionsEqual();
    }
    return childControlsDirty;
  }

  get originalValue(): any {
    return this.startCollection.values;
  }

  private startCollection: AbstractControl[];

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

    this.startCollection = [...controls];
  }

  push(control: AbstractControl): void {
    super.push(control);
  }

  insert(index: number, control: AbstractControl): void {
    super.insert(index, control);
  }
  removeAt(index: number): void {
    super.removeAt(index);
  }

  setControl(index: number, control: AbstractControl): void {
    super.setControl(index, control);
  }

  collectionsEqual(): boolean {
    let result = this.startCollection.length === this.controls.length;

    if (result) {
      const t = [];
      this.startCollection.forEach((a) => {
        this.controls.forEach((b) => {
          if (a.value === b.value) {
            t.push(b);
          }
        });
      });
      result = t.length === this.startCollection.length;
    }

    return result;
  }
}
