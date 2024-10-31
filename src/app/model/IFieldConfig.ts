import { UntypedFormGroup } from '@angular/forms';
import { IFieldValidator } from './IFieldValidator';
import { IColumnDefinition } from './IColumnDefinition';
export interface IFieldConfig {
  key?: string;
  label?: string;
  inputType?: string;
  options?: object[];
  collection?: object;
  controlType: string;
  value?: object;
  validators?: IFieldValidator[];
  required?: boolean;
  children?: IFieldConfig[];
  group?: UntypedFormGroup;
  columnDefinitions?: IColumnDefinition[];
  columnClass?: string;
}
