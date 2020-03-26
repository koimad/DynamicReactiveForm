import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, ValidatorFn, AbstractControlOptions, AsyncValidatorFn } from '@angular/forms';
import { FormControlExtended } from './FormControlExtended';
import { FormGroupExtended } from './FormGroupExtended';
import { Injectable } from '@angular/core';

function isAbstractControlOptions(
  options: AbstractControlOptions | { [key: string]: any }
): options is AbstractControlOptions {
  return (
    (options as AbstractControlOptions).asyncValidators !== undefined ||
    (options as AbstractControlOptions).validators !== undefined ||
    (options as AbstractControlOptions).updateOn !== undefined
  );
}

export type FormHooks = 'change' | 'blur' | 'submit';

@Injectable()
export class FormBuilderExtended extends FormBuilder {
  constructor() {
    super();
  }

  public control(
    formState: any,
    validatorOrOpts?: ValidatorFn | ValidatorFn[] | AbstractControlOptions | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ): FormControl {
    return new FormControlExtended(formState, validatorOrOpts, asyncValidator);
  }

  group(
    controlsConfig: {
      [key: string]: any;
    },
    options?:
      | AbstractControlOptions
      | {
          [key: string]: any;
        }
      | null
  ): FormGroup {
    let validators: ValidatorFn | ValidatorFn[] | null = null;
    let asyncValidators: AsyncValidatorFn | AsyncValidatorFn[] | null = null;
    let updateOn: FormHooks | undefined;

    if (options != null) {
      if (isAbstractControlOptions(options)) {
        // `options` are `AbstractControlOptions`
        validators = options.validators != null ? options.validators : null;
        asyncValidators = options.asyncValidators != null ? options.asyncValidators : null;
        updateOn = options.updateOn != null ? options.updateOn : undefined;
      } else {
        // `options` are legacy form group options
        validators = options.validator != null ? options.validator : null;
        asyncValidators = options.asyncValidator != null ? options.asyncValidator : null;
      }
    }

    const g = super.group(controlsConfig, options);

    return new FormGroupExtended(g.controls, { asyncValidators, updateOn, validators });
  }
}
