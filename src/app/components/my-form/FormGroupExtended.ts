import { FormGroup, AbstractControl } from '@angular/forms';
import {
  ValidatorFn,
  AbstractControlOptions,
  AsyncValidatorFn
} from '@angular/forms';
export class FormGroupExtended extends FormGroup {
  get dirty(): boolean {
    let childControlsDirty = false;
    Object.keys(this.controls).forEach(key => {
      childControlsDirty = childControlsDirty || this.controls[key].dirty;
    });

    // console.log(`FormGroup: ${childControlsDirty}`);
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
