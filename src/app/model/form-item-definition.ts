import { ValidatorFn, AsyncValidatorFn, FormGroup } from '@angular/forms';

export interface FieldValidator {
  name: string;
  validator: ValidatorFn | AsyncValidatorFn;
  message: string;
}

export interface FieldConfig {
  key?: string;
  label?: string;
  inputType?: string;
  options?: any[];
  collection?: any;
  controlType: string;
  value?: any;
  validators?: FieldValidator[];
  required?: boolean;
  children?: FieldConfig[];
  group?: FormGroup;
  columnDefinitions? : any[];
}
