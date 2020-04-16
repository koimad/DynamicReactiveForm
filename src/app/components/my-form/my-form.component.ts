import { FieldConfig } from '../../model/form-item-definition';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
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
            key: 'FullName',
            label: 'Full Name',
            controlType: 'group',
            children: [
              {
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
                key: 'Surname',
                label: 'Surname',
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
            controlType: 'radioButton',
            label: 'Gender',
            options: ['Male', 'Female'],
          },
          {
            key: 'Age',
            controlType: 'comboBox',
            label: 'Age',
            options: ['1', '2', '3', '4'],
          },
          {
            key: 'Nationality',
            controlType: 'checkBox',
            label: 'Are You British',
            options: [null, true, false],
            value: null,
            validators: [
              {
                name: 'pattern',
                validator: Validators.pattern('true'),
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
            controlType: 'cudGrid',
            label: 'Children',
            options: null,
            columnDefinitions: [
              {
                headerName: 'First Name',
                field: 'firstName',
                width: 120,
                cellRenderer: 'formTextCell',
                editable: false,
                resizable: false,
              },
              {
                headerName: 'Middle Name',
                field: 'middleName',
                width: 120,
                cellRenderer: 'formTextCell',
                editable: false,
                resizable: false,
              },
              {
                headerName: 'Age',
                field: 'age',
                width: 100,
                cellRenderer: 'formTextCell',
                editable: false,
                resizable: false,
              },
            ],
            value: [
              {
                firstName: 'Kieran',
                middleName: 'Barth',
                age: 13,
              },
              {
                firstName: 'Chloe',
                middleName: 'Sophia',
                age: 9,
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
        // this.updatingControl = undefined;
        const allUpdatedControls = this.updatedFormValueService.getUpdatedValues(
          this.rootFormGroup
        );
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
          const childGroup = new FormBuilderExtended().group({});
          this.createGroup(childGroup, field.children);
          formGroup.addControl(field.key, childGroup);
        }
      } else if (field.controlType === 'cudGrid') {
        const childGroup = new FormBuilderExtended().group(
          [field.key],
          this.buildValidators(field.validators)
        );
        formGroup.addControl(field.key, childGroup);
        field.group = childGroup;
      } else {
        field.group = formGroup;
        formGroup.addControl(
          field.key,
          new FormBuilderExtended().control(
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
