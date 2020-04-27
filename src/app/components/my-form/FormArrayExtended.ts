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

  public getChanges(): { [key: string]: AbstractControl[] } {

    const added = this.controls.filter(f => !this._startCollection.includes(f));
    const removed = this._startCollection.filter(f => !this.controls.includes(f));
    const modified = this.controls.filter(f => this._startCollection.includes(f) && f.dirty);
    // console.log('getChanges');
    // console.log(added);
    // console.log(removed);
    // console.log(modified);

    return {
      added,
      removed,
      modified
    };
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
