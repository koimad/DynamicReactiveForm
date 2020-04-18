import { FieldConfig } from '../../model/form-item-definition';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  ValidatorFn,
 } from '@angular/forms';
import { FormBuilderExtended } from './FormBuilderExtended';
import { FormUpdatedValuesService } from 'src/app/model/form-updated-values.service';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css'],
})
export class MyFormComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilderExtended,
    private updatedFormValueService: FormUpdatedValuesService
  ) {
    this.fields = [
      {
        key: 'Genreal',
        label: 'Gerneral',
        value: '',
        controlType: 'formTab',
        validators: [],
        children: [
          {
            columnClass:'form-Column1-12',
            key: 'FullName',
            label: 'Full Name',
            controlType: 'group',
            children: [
              {
                columnClass: 'form-Column1-12',
                key: 'FirstName',
                label: 'First Name',
                value: '',
                controlType: 'textBox',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    message: 'Must be Specified',
                  },
                ],
              },
              {
                columnClass: 'form-Column1-12',
                key: 'MiddleName',
                label: 'Middle Name',
                value: '',
                controlType: 'textBox',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    message: 'Must be Specified',
                  },
                ],
              },
              {
                columnClass: 'form-Column1-12',
                key: 'LastName',
                label: 'Last Name',
                value: '',
                controlType: 'textBox',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    message: 'Must be Specified',
                  },
                ],
              },
            ],
          },
          {
            key: 'Gender',
            columnClass: 'form-Column1-6',
            controlType: 'radioButton',
            label: 'Gender',
            options: ['Male', 'Female'],
          },
          {
            key: 'Age',
            columnClass: 'form-Column7-6',
            controlType: 'comboBox',
            label: 'Age',
            options: [1, 2, 3, 4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,
              21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,
              41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60],
          },
          {
            key: 'Nationality',
            columnClass: 'form-Column4-4',
            controlType: 'checkBox',
            label: 'Are You British',
            options: [true, false, null],
            value: null,
            validators: [
              {
                name: 'pattern',
                validator: Validators.required,
                message: 'Must be Specified',
              },
            ],
          },
        ],
      },
      {
        key: 'FamilyMembers',
        label: 'Family Members',
        value: '',
        controlType: 'formTab',
        validators: [],
        children: [
          {
            key: 'Children',
            columnClass: 'form-Column1-12',
            controlType: 'cudGrid',
            label: 'Children',
            options: null,
            columnDefinitions: [
              {
                headerName: 'First Name',
                field: 'firstName',
                width: 120,
                cellRenderer: 'text',
                editable: false,
                resizable: false,
              },
              {
                headerName: 'Middle Name',
                field: 'middleName',
                width: 120,
                cellRenderer: 'text',
                editable: false,
                resizable: false,
              },
              {
                headerName: 'Age',
                field: 'age',
                width: 100,
                cellRenderer: 'number',
                editable: false,
                resizable: false,
              },
            ],
            value: [
              {
                firstName: 'Bob',
                middleName: 'Thomas',
                age: 19,
              },
              {
                firstName: 'Jordan',
                middleName: 'Kelly',
                age: 21,
              },
            ],
            children: [],
            validators: [],
          },
        ],
      },
      {
        key: 'Address',
        label: 'Address',
        value: '',
        controlType: 'formTab',
        validators: [],
        children: [],
      },
    ];
  }
  public rootFormGroup: FormGroup;
  public fields: Array<FieldConfig>;
  public submitData = '';

  ngOnInit() {
    try {
      this.rootFormGroup = this.formBuilder.group({});

      this.createGroup(this.rootFormGroup, this.fields);

      this.rootFormGroup.valueChanges.subscribe((f) => {
        this.updatedFormValueService.getUpdatedValues(this.rootFormGroup);
      });
    } catch (e) {
      console.log(e);
    }
  }

  private createGroup(formGroup: FormGroup, fields: Array<FieldConfig>): void {
    fields.forEach((field) => {
      if (field.controlType === 'group' || field.controlType === 'formTab') {
        if (field.children) {
          field.group = formGroup;
          const childGroup = this.formBuilder.group({});
          this.createGroup(childGroup, field.children);
          formGroup.addControl(field.key, childGroup);
        }
      } else if (field.controlType === 'cudGrid') {
        const childGroup = this.formBuilder.group(
          [field.key],
          this.buildValidators(field.validators)
        );
        formGroup.addControl(field.key, childGroup);
        field.group = childGroup;
      } else {
        field.group = formGroup;
        formGroup.addControl(
          field.key,
          this.formBuilder.control(
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
    console.log(this.rootFormGroup.value);
    this.submitData = this.updatedFormValueService.getnerateChangedControlString();
  }
}
