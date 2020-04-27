import { Component, Input } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { FormUpdatedValuesService } from 'src/app/model/form-updated-values.service';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { FormBuilderExtended } from './FormBuilderExtended';

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.scss'],
})
export class MyFormComponent {

  @Input('formData')
  public set formData(value: IFieldConfig[]) {
    this._formData = value;
    this.setupForm();
  };

  public get formData(): IFieldConfig[] {
    return this._formData;
  }

  private _formData: IFieldConfig[];

  public rootFormGroup: FormGroup;
  public fields: Array<IFieldConfig>;
  public submitData = '';

  constructor(
    private _formBuilder: FormBuilderExtended,
    private _updatedFormValueService: FormUpdatedValuesService
  ) { }

  private setupForm(): void {

    try {
      this.rootFormGroup = this._formBuilder.group({});

      this.createGroup(this.rootFormGroup, this._formData);

      this.rootFormGroup.valueChanges.subscribe((f) => {
        this._updatedFormValueService.getUpdatedValues(this.rootFormGroup);

      });
    } catch (e) {
      console.log(e);
    }
  }


  private createGroup(formGroup: FormGroup, fields: Array<IFieldConfig>): void {

    fields.forEach((field) => {
      if (field.controlType === 'group' || field.controlType === 'formTab') {
        if (field.children) {
          field.group = formGroup;
          const childGroup = this._formBuilder.group({});
          this.createGroup(childGroup, field.children);
          formGroup.addControl(field.key, childGroup);
        }
      } else if (field.controlType === 'cudGrid') {
        const childGroup = this._formBuilder.group(
          [field.key],
          this.buildValidators(field.validators)
        );
        formGroup.addControl(field.key, childGroup);
        field.group = childGroup;
      } else if (field.controlType === 'dragDrop') {
        field.group = formGroup;
      } else {
        field.group = formGroup;
        formGroup.addControl(
          field.key,
          this._formBuilder.control(
            field.value,
            this.buildValidators(field.validators)
          )
        );
      }
    });
  }


  private buildValidators(validations: any[]): ValidatorFn {
    let result: ValidatorFn;
    const validatorList = [];
    if (validations && validations.length > 0) {
      validations.forEach((fieldValidator) => {
        validatorList.push(fieldValidator.validator);
        result = Validators.compose(validatorList);
      });
    }
    return result;
  }


  public submit(): void {
    this.submitData = this._updatedFormValueService.getnerateChangedControlString();
  }
}
