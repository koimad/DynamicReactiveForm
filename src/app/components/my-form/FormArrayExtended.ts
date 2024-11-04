import { AbstractControl, UntypedFormArray } from '@angular/forms';
import { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';

export class FormArrayExtended extends UntypedFormArray {
  private _startCollection: AbstractControl[];

  public constructor(
    controls: AbstractControl[],
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);

    this._startCollection = [...controls];
  }

  private collectionsEqual(): boolean {
    let result = this._startCollection.length === this.controls.length;

    if (result) {
      for (let i = 0; i < this._startCollection.length; i++) {
        if (this._startCollection[i].value !== this.controls[i].value) {
          result = false;
          break;
        }
      }
    }

    return result;
  }

  public get dirty(): boolean {
    let childControlsDirty = false;
    Object.keys(this.controls).forEach(key => {
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

  public getChanges(): Record<string, AbstractControl[]> {
    const added = this.controls.filter(f => !this._startCollection.includes(f));
    const deleted = this._startCollection.filter(f => !this.controls.includes(f));
    const modified = this.controls.filter(f => this._startCollection.includes(f) && f.dirty);

    return {
      added,
      deleted,
      modified
    };
  }

  public push(control: AbstractControl): void {
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
}
