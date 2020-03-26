import { FormControl, ValidatorFn, AbstractControlOptions, AsyncValidatorFn } from '@angular/forms';

export class FormControlExtended extends FormControl {
  originalValue: any;

  get dirty(): boolean {
    return !this.pristine && this.value !== this.originalValue;
  }

  constructor(
    formState?: any,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(formState, validatorOrOpts, asyncValidator);
    this.originalValue = this.value;
  }

  setValue(
    value: any,
    options?: {
      onlySelf?: boolean;
      emitEvent?: boolean;
      emitModelToViewChange?: boolean;
      emitViewToModelChange?: boolean;
    }
  ): void {
    super.setValue(value, options);
  }
}
