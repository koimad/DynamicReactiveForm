import { AbstractControl, UntypedFormGroup } from '@angular/forms';
import { AbstractControlOptions, AsyncValidatorFn, ValidatorFn } from '@angular/forms';

export class FormGroupExtended extends UntypedFormGroup {
  public entityType: string;

  public constructor(
    controls: Record<string, AbstractControl>,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ) {
    super(controls, validatorOrOpts, asyncValidator);
  }

  public get dirty(): boolean {
    let childControlsDirty = false;

    Object.keys(this.controls).forEach(key => {
      childControlsDirty = childControlsDirty || this.controls[key].dirty;
    });

    return childControlsDirty;
  }
}
