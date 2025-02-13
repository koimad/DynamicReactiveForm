import { Validators } from '@angular/forms';

import { maxDate } from '../../validators/dateValidators';

export class FamiliyFormData {
  public FormData = [
    {
      key: 'General',
      label: 'General',
      value: '',
      controlType: 'formTab',
      validators: [],
      children: [
        {
          columnClass: 'form-Column1-12',
          key: 'FullName',
          label: 'Full Name',
          controlType: 'group',
          children: [
            {
              columnClass: 'form-Column1-12',
              key: 'FirstName',
              label: 'First Name',
              value: 'Tom',
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
              columnClass: 'form-Column1-12',
              key: 'MiddleName',
              label: 'Middle Name',
              value: 'Adrian',
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
              columnClass: 'form-Column1-12',
              key: 'LastName',
              label: 'Last Name',
              value: 'Cox',
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
          columnClass: 'form-Column1-6',
          controlType: 'radioButton',
          label: 'Gender',
          options: ['Male', 'Female'],
          value: 'Male'
        },
        {
          key: 'ParentAge',
          columnClass: 'form-Column7-6',
          controlType: 'comboBox',
          label: 'Age',
          options: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
            30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
            57, 58, 59, 60
          ]
        },
        {
          key: 'Nationality',
          columnClass: 'form-Column4-end',
          controlType: 'checkBox',
          label: 'Are You British',
          options: [true, false], //[true, false, null]
          value: true,
          validators: [
            {
              name: 'required',
              validator: Validators.required,
              message: 'Must be Specified'
            }
          ]
        },
        {
          key: 'DOB',
          columnClass: 'form-Column1-4',
          controlType: 'datePicker',
          label: 'Date Of Birth',
          value: new Date('12/21/1980'),
          validators: [
            {
              name: 'maxDate',
              validator: maxDate(new Date(), 'maxDate'),
              message: 'Date cannot be greater than today.'
            },
            {
              name: 'required',
              validator: Validators.required,
              message: 'Date Of Birth must be specified'
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
          columnClass: 'form-Column1-12',
          controlType: 'cudGrid',
          label: 'Children',
          entityType: 'Person',
          options: null,
          columnDefinitions: [
            {
              headerName: 'Id',
              field: 'Id',
              width: 20,
              cellRenderer: 'number',
              editable: false,
              resizable: false
            },
            {
              headerName: 'First Name',
              field: 'FirstName',
              width: 120,
              cellRenderer: 'text',
              editable: false,
              resizable: false
            },
            {
              headerName: 'Middle Name',
              field: 'MiddleName',
              width: 120,
              cellRenderer: 'text',
              editable: false,
              resizable: false
            },
            {
              headerName: 'Age',
              field: 'Age',
              width: 100,
              cellRenderer: 'number',
              editable: false,
              resizable: false
            }
          ],
          value: [
            {
              Id: 100,
              FirstName: 'Bob',
              MiddleName: 'Thomas',
              Age: 19
            },
            {
              Id: 101,
              FirstName: 'Jordan',
              MiddleName: 'Kelly',
              Age: 21
            }
          ],
          children: [],
          validators: []
        }
      ]
    },
    {
      key: 'Shopping',
      label: 'Shopping Basket',
      value: '',
      controlType: 'formTab',
      validators: [],
      children: [
        {
          key: 'ShoppingBasket',
          label: 'Select Items',
          entityType: 'Food',
          options: [
            { Id: 1, Name: 'Carrots' },
            { Id: 2, Name: 'Apples' },
            { Id: 3, Name: 'Oranges' },
            { Id: 4, Name: 'Tomatoes' },
            { Id: 5, Name: 'Grapes' }
          ],
          value: [
            { Id: 1, Name: 'Carrots' },
            { Id: 2, Name: 'Apples' },
            { Id: 2, Name: 'Apples' }
          ],
          controlType: 'dragDrop',
          validators: [
            {
              name: 'minlength',
              validator: Validators.minLength(2),
              message: 'Must have at least 2 items.'
            },
            {
              name: 'maxlength',
              validator: Validators.maxLength(4),
              message: "Don't be greedy no more than 4 items."
            }
          ],
          children: []
        }
      ]
    }
  ];
}

