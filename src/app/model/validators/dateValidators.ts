import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function maxDate(maxValue: Date, errorName): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value > maxValue ? { [errorName]: 'Date Error' } : null;
  };
}
