import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormUpdatedValuesService {
  constructor() {}
  private updatedValues = new Map<string, { control: any; oldValue: any }>();
  getnerateChangedControlString(): string {
    let result = '';
    this.updatedValues.forEach((c, k, m) => {
      console.log(c);

      console.log('adding flat');
      result += `Property : ${k} OldValue : ${JSON.stringify(
        c.control.originalValue
      )} NewValue : ${JSON.stringify(c.control.value)} \r\n`;
    });
    return result;
  }

  getUpdatedValues(formGroup: AbstractControl) {
    const updatedFormValues = [];

    // tslint:disable-next-line:no-string-literal
    formGroup['_forEachChild']((control, name) => {
      if (control.dirty) {
        if (control instanceof FormGroup) {
          this.getUpdatedValues(control).forEach((f) =>
            updatedFormValues.push(f)
          );
        } else {
          let existingChange = false;

          this.updatedValues.forEach((c, k, m) => {
            // console.log(`${k}   ${name}    ${c.oldValue}    ${control.value}`);

            if (k === name && c.oldValue === control.value) {
              // console.log(`${k}   ${name}`);
              existingChange = true;
            }
          });

          if (!existingChange) {
            this.updatedValues.set(name, {
              control,
              oldValue: control.originalValue,
            });
            // console.log(`Setting updating Control to ${control.value}`);
            // this.updatingControl = control;
          }
          updatedFormValues.push({ name, value: control.value });
        }
      }
    });
    return updatedFormValues;
  }
}
