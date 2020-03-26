import { FieldConfig } from '../../model/form-item-definition';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { FormBuilderExtended } from './FormBuilderExtended';

@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css'],
  providers: [{ provide: FormBuilderExtended, useClass: FormBuilderExtended }]
})
export class MyFormComponent implements OnInit {
  public rootFormGroup: FormGroup;

  public dynamicFormGroup: FormGroup;

  public fields: Array<FieldConfig>;

  constructor(private formBuilder: FormBuilderExtended) {
    this.fields = [
      {
        key: 'Control1',
        label: 'Hello World 1',
        value: 'smith',
        controlType: 'textBox',
        validators: [
          {
            name: 'pattern',
            validator: Validators.pattern('^[A-Z]+$'),
            message: 'Must be upper case'
          },
          {
            name: 'required',
            validator: Validators.required,
            message: 'Must be Specified'
          }
        ],
        children: []
      },
      {
        key: 'Control2',
        label: 'Hello World 2',
        controlType: 'group',
        children: [
          {
            label: 'Hello World 1 Child 1',
            key: 'ChildControl1',
            value: 'ChildControl1',
            controlType: 'textBox'
          }
        ]
      },
      {
        label: 'Hello World 1 Child 2',
        key: 'ChildControl2',
        value: 'ChildControl2',
        controlType: 'textBox'
      },
      {
        key: 'Control3',
        label: 'Hello World 3',
        controlType: 'group',
        children: [
          {
            label: 'Hello World 2 Child 1',
            key: 'ChildControl21',
            value: 'ChildControl21',
            controlType: 'textBox'
          },
          {
            label: 'Hello World 2 Child2',
            key: 'ChildControl22',
            value: 'ChildControl22',
            controlType: 'textBox'
          }
        ]
      },
      {
        key: 'Control4',
        controlType: 'radioButton',
        label: 'Gender',
        options: ['Male', 'Female']
      },
      {
        key: 'Control5',
        controlType: 'comboBox',
        label: 'Age',
        options: ['1', '2', '3', '4']
      },
      {
        key: 'Control6',
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
      },
      ,
      {
        key: 'Control7',
        controlType: 'cudGrid',
        label: 'Row Data',
        options: null,
        value: ['1', '2', '3', '4'],
        validators: []
      }
    ];
  }

  ngOnInit() {
    try {
      this.rootFormGroup = this.formBuilder.group({
        firstName: '',
        surname: ''
      });

      const group = new FormBuilderExtended().group({});

      this.createGroup(group, this.fields);

      this.dynamicFormGroup = group;
    } catch (e) {
      console.log(e);
    }
  }

  private createGroup(formGroup: FormGroup, fields: Array<FieldConfig>): void {
    fields.forEach(field => {
      if (field.controlType === 'group') {
        if (field.children) {
          const childGroup = new FormBuilderExtended().group({});

          this.createGroup(childGroup, field.children);
          // const fg: FormGroup = new FormBuilderExtended().group({ key: field.key, childGroup });
          formGroup.addControl(field.key, childGroup);
          // formGroup[field.key] = fg;
        }
      } else {
        formGroup.addControl(
          field.key,
          new FormBuilderExtended().control(
            field.value,
            this.buildValidators(field.validators)
          )
        );
        // formGroup[field.key] = new FormBuilderExtended().control(field.value);
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
}
