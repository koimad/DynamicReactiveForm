import { FieldConfig } from '../../model/form-item-definition';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  ValidatorFn,
  Form,
  FormArray,
  AbstractControl
} from '@angular/forms';
import { FormBuilderExtended } from './FormBuilderExtended';
import { group } from '@angular/animations';
import { ConstantPool } from '@angular/compiler';
import { FormArrayExtended } from './FormArrayExtended';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css'],
  providers: [{ provide: FormBuilderExtended, useClass: FormBuilderExtended }]
})
export class MyFormComponent implements OnInit {
  constructor(private formBuilder: FormBuilderExtended) {
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
                    message: 'Must be Specified'
                  }
                ]
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
                    message: 'Must be Specified'
                  }
                ]
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
                    message: 'Must be Specified'
                  }
                ]
              }
            ]
          },
          {
            key: 'Gender',
            controlType: 'radioButton',
            label: 'Gender',
            options: ['Male', 'Female']
          },
          {
            key: 'Age',
            controlType: 'comboBox',
            label: 'Age',
            options: ['1', '2', '3', '4']
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
                message: 'Must be Specified'
              }
            ]
          }
        ]
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
            value: [
              {
                firstName: '',
                middleName: '',
                age: ''
              },
              {
                firstName: '',
                middleName: '',
                age: ''
              },
              {
                firstName: '',
                middleName: '',
                age: ''
              }
            ],
            validators: []
          }
        ]
      },
      {
        key: 'Address',
        label: 'Address',
        value: '',
        controlType: 'formTab',
        validators: [],
        children: []
      }
    ];
  }
  public rootFormGroup: FormGroup;
  public fields: Array<FieldConfig>;

  private updatedValues = new Map<string, { control: any; oldValue: any }>();
  private updatingControl: AbstractControl;
  public submitData = '';

  ngOnInit() {
    try {
      this.rootFormGroup = new FormBuilderExtended().group({});

      this.createGroup(this.rootFormGroup, this.fields);

      this.rootFormGroup.valueChanges.subscribe(f => {
        this.updatingControl = undefined;
        const allUpdatedControls = this.getUpdatedValues(this.rootFormGroup);

        this.updatedValues.forEach((v, k, m) => {
          let found = false;
          allUpdatedControls.forEach(updatedControl => {
            if (updatedControl.name === k) {
              found = true;
            }
          });
          if (!found) {
            console.log(`removing ${v}`);
            this.updatingControl = v.control;
            this.updatedValues.delete(k);
          }
        });
        console.log('All Updated Contols ');
        console.log(this.updatedValues);
        console.log();
        console.log('Updating Control ');
        console.log(this.updatingControl);
        console.log();
        console.log(
          `Updated Control Value ${
            this.updatingControl
              ? this.updatingControl.value
                ? this.updatingControl.value
                : null
              : null
          }`
        );
      });
    } catch (e) {
      console.log(e);
    }
  }

  getUpdatedValues(formGroup: AbstractControl) {
    const updatedFormValues = [];

    // tslint:disable-next-line:no-string-literal
    formGroup['_forEachChild']((control, name) => {
      if (control.dirty) {
        if (control instanceof FormGroup) {
          this.getUpdatedValues(control).forEach(f =>
            updatedFormValues.push(f)
          );
        } else {
          let existingChange = false;

          this.updatedValues.forEach((c, k, m) => {
            console.log(`${k}   ${name}    ${c.oldValue}    ${control.value}`);

            if (k === name && c.oldValue === control.value) {
              console.log(`${k}   ${name}`);
              existingChange = true;
            }
          });

          if (!existingChange) {
            this.updatedValues.set(name, {
              control,
              oldValue: control.originalValue
            });
            console.log(`Setting updating Control to ${control.value}`);
            this.updatingControl = control;
          }
          updatedFormValues.push({ name, value: control.value });
        }
      }
    });
    return updatedFormValues;
  }

  private createGroup(formGroup: FormGroup, fields: Array<FieldConfig>): void {
    fields.forEach(field => {
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
      validations.forEach(fieldValidator => {
        validatorList.push(fieldValidator.validator);
        result = Validators.compose(validatorList);
      });
    }
    return result;
  }

  public submit(): void {
    this.submitData = '';
    console.log(this.rootFormGroup.value);
    this.updatedValues.forEach((c, k, m) => {
      console.log(c);

      console.log('adding flat');
      this.submitData += `Property : ${k} OldValue : ${JSON.stringify(
        c.control.originalValue
      )} NewValue : ${JSON.stringify(c.control.value)} \r\n`;
    });
  }
}
