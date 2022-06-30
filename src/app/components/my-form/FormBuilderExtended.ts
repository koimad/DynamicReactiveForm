import { Injectable } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import {
  AbstractControlOptions,
  AsyncValidatorFn,
  UntypedFormControl,
  ValidatorFn
} from '@angular/forms';
import { FormArrayExtended } from './FormArrayExtended';
import { FormControlExtended } from './FormControlExtended';
import { FormGroupExtended } from './FormGroupExtended';

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
export class FormBuilderExtended extends UntypedFormBuilder {
  constructor() {
    super();
  }

  public control(
    formState: any,
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ): UntypedFormControl {
    return new FormControlExtended(formState, validatorOrOpts, asyncValidator);
  }

  public array(
    controlsConfig: any[],
    validatorOrOpts?:
      | ValidatorFn
      | ValidatorFn[]
      | AbstractControlOptions
      | null,
    asyncValidator?: AsyncValidatorFn | AsyncValidatorFn[] | null
  ): UntypedFormArray {
    return new FormArrayExtended(
      controlsConfig,
      validatorOrOpts,
      asyncValidator
    );
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
  ): UntypedFormGroup {
    let validators: ValidatorFn | ValidatorFn[] | null = null;
    let asyncValidators: AsyncValidatorFn | AsyncValidatorFn[] | null = null;
    let updateOn: FormHooks | undefined;

    if (options != null) {
      if (isAbstractControlOptions(options)) {
        // `options` are `AbstractControlOptions`
        validators = options.validators != null ? options.validators : null;
        asyncValidators =
          options.asyncValidators != null ? options.asyncValidators : null;
        updateOn = options.updateOn != null ? options.updateOn : undefined;
      } else {
        // `options` are legacy form group options
        validators = options.validator != null ? options.validator : null;
        asyncValidators =
          options.asyncValidator != null ? options.asyncValidator : null;
      }
    }

    const g = super.group(controlsConfig, options);

    return new FormGroupExtended(g.controls, {
      asyncValidators,
      updateOn,
      validators
    });
  }
}
