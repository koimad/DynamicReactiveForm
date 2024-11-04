import { AbstractControlOptions, AsyncValidatorFn, UntypedFormControl, ValidatorFn } from '@angular/forms';

export class FormControlExtended extends UntypedFormControl {
  private _originalValue: any;

  private _previousValue: any;

  public constructor(
    formState?: any,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(formState, validatorOrOpts, asyncValidator);
    this._originalValue = this.value;
    this._previousValue = this.value;
  }

  public get dirty(): boolean {
    return !this.pristine && this.value !== this._originalValue;
  }

  public get originalValue(): any {
    return this._originalValue;
  }

  public get PreviousValue(): any {
    return this._previousValue;
  }

  public setValue(
    value: any,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    }
  ): void {
    this._previousValue = this.value;
    super.setValue(value, options);
  }
}
