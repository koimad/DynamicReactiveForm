import { Validators } from '@angular/forms';

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
          options: [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60
          ],
        },
        {
          key: 'Nationality',
          columnClass: 'form-Column4-end',
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
        {
          key: 'DOB',
          columnClass: 'form-Column1-4',
          controlType: 'datePicker',
          label: 'Date Of Birth',
          value: null,
          validators: [
            {
              name: 'pattern',
              validator: Validators.required,
              message: 'Date Of Birth must be specified',
            },
          ],
        },
      ],
    },
    // {
    //   key: 'FamilyMembers',
    //   label: 'Family Members',
    //   value: '',
    //   controlType: 'formTab',
    //   validators: [],
    //   children: [
    //     {
    //       key: 'Children',
    //       columnClass: 'form-Column1-12',
    //       controlType: 'cudGrid',
    //       label: 'Children',
    //       options: null,
    //       columnDefinitions: [
    //         {
    //           headerName: 'First Name',
    //           field: 'firstName',
    //           width: 120,
    //           cellRenderer: 'text',
    //           editable: false,
    //           resizable: false,
    //         },
    //         {
    //           headerName: 'Middle Name',
    //           field: 'middleName',
    //           width: 120,
    //           cellRenderer: 'text',
    //           editable: false,
    //           resizable: false,
    //         },
    //         {
    //           headerName: 'Age',
    //           field: 'age',
    //           width: 100,
    //           cellRenderer: 'number',
    //           editable: false,
    //           resizable: false,
    //         },
    //       ],
    //       value: [
    //         {
    //           firstName: 'Bob',
    //           middleName: 'Thomas',
    //           age: 19,
    //         },
    //         {
    //           firstName: 'Jordan',
    //           middleName: 'Kelly',
    //           age: 21,
    //         },
    //       ],
    //       children: [],
    //       validators: [],
    //     },
    //   ],
    // },
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
          options: ['Carrots', 'Apples', 'Oranges', 'Tomatoes', 'Grapes'],
          value: ['Carrots', 'Apples'],
          controlType: 'dragDrop',
          validators: [
            {
              name: 'minlength',
              validator: Validators.minLength(3),
              message: 'Must have at least 3 items',
            },
            {
              name: 'maxlength',
              validator: Validators.maxLength(5),
              message: 'Must have no more than 5 items',
            }
          ],
          children: []
        }
      ],
    },
  ];
}
