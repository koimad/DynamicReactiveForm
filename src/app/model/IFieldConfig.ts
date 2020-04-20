import { FormGroup } from '@angular/forms';
import { IFieldValidator } from './IFieldValidator';
export interface IFieldConfig {
    key?: string;
    label?: string;
    inputType?: string;
    options?: any[];
    collection?: any;
    controlType: string;
    value?: any;
    validators?: IFieldValidator[];
    required?: boolean;
    children?: IFieldConfig[];
    group?: FormGroup;
    columnDefinitions?: any[];
    columnClass?: string;
}
