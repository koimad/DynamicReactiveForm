import { AbstractControl, UntypedFormArray } from '@angular/forms';
import {
  AbstractControlOptions,
  AsyncValidatorFn,
  ValidatorFn,
} from '@angular/forms';

export class FormArrayExtended extends UntypedFormArray {

  private _key: string;

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

  get Key() : string {
    return this._key;
  }

  public get originalValue(): any {
    return this._startCollection.values;
  }

  public getChanges(): { [key: string]: AbstractControl[] } {

    const added = this.controls.filter(f => !this._startCollection.includes(f));
    const deleted = this._startCollection.filter(f => !this.controls.includes(f));
    const modified = this.controls.filter(f => this._startCollection.includes(f) && f.dirty);
1
    return {
      added,
      deleted,
      modified
    };
  }

  private _startCollection: AbstractControl[];

  constructor(
    key: string,
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
    this._key= key;
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
      for (let i = 0; i < this._startCollection.length; i++) {
        if (this._startCollection[i].value !== this.controls[i].value) {
          result = false;
          break;
        };
      }
    }

    return result;
  }
}
