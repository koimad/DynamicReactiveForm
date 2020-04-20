import { AsyncValidatorFn, ValidatorFn } from '@angular/forms';
export interface IFieldValidator {
    name: string;
    validator: ValidatorFn | AsyncValidatorFn;
    message: string;
}
