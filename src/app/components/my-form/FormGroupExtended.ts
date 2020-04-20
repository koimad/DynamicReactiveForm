import { AbstractControl, FormGroup } from '@angular/forms';
import {
  AbstractControlOptions,
  AsyncValidatorFn,
  ValidatorFn,
} from '@angular/forms';
export class FormGroupExtended extends FormGroup {
  get dirty(): boolean {
    let childControlsDirty = false;
    Object.keys(this.controls).forEach((key) => {
      childControlsDirty = childControlsDirty || this.controls[key].dirty;
    });

    return childControlsDirty;
  }

  constructor(
    controls: {
      [key: string]: AbstractControl;
    },
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }
}
