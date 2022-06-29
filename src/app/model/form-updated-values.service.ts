import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { FormArrayExtended } from '../components/my-form/FormArrayExtended';



@Injectable({
  providedIn: 'root',
})
export class FormUpdatedValuesService {
  constructor() { }
  private _updatedValues = new Map<string, { control: any; oldValue: any }>();

  public getnerateChangedControlString(): string[] {
    let result = [];

    this._updatedValues.forEach((c, k, m) => {
      let resultItem = '';
      //console.log(c);
      //console.log('adding flat');
      const a = c.control as FormArrayExtended;
      if (c.control instanceof FormArrayExtended) {
        //console.log('FormArrayExtended');
        //console.log(a);

        a.getChanges().added.forEach(control => {
          resultItem = `Property : ${k}    `;
          resultItem += `Added     `;
          resultItem += `NewValue : ${JSON.stringify(control.value)}     `;
          result.push(resultItem);
        });


        a.getChanges().removed.forEach(control => {
          resultItem = `Property : ${k}    `;
          resultItem += `Removed     `;
          resultItem += `NewValue : ${JSON.stringify(control.value)}     `;
          result.push(resultItem);
        });


        a.getChanges().modified.forEach(control => {
          resultItem = `Property : ${k}    `;
          resultItem += `Modfifed     `;
          resultItem += `NewValue : ${JSON.stringify(control.value)}     `;
          result.push(resultItem);
        });


      } else if (c.control.value !== c.control.originalValue) {

        resultItem = `Property : ${k} OldValue : ${JSON.stringify(
          c.control.originalValue
        )} NewValue : ${JSON.stringify(c.control.value)}`;
        result.push(resultItem);
      }
    });
    return result;
  }

  public getUpdatedValues(formGroup: AbstractControl) {
    const updatedFormValue = [];

    // tslint:disable-next-line:no-string-literal
    formGroup['_forEachChild']((control, name) => {
      if (control.dirty) {
        if (control instanceof FormGroup) {
          let index = 0;
          this.getUpdatedValues(control).forEach((f) =>
            updatedFormValue.push({ name: `${f.name}${index++}`, newValue: f.newValue, oldValue: f.oldValue, control: f.control })
          );
        }
        else if (control instanceof FormArray) {
          let index = 0;
          this.getUpdatedValues(control).forEach((f) =>
            updatedFormValue.push({ name: `${f.name}${index++}`, newValue: f.newValue, oldValue: f.oldValue, control: f.control })
          );
        }
        else {
          let existingChange = false;

          this._updatedValues.forEach((c, k, m) => {
            // console.log(`${k}   ${name}    ${c.oldValue}    ${control.value}`);

            if (k === name && c.oldValue === control.value) {
              // console.log(`${k}   ${name}`);
              existingChange = true;
            }
          });

          if (!existingChange) {

            this._updatedValues.delete(name);

            this._updatedValues.set(name, {
              control,
              oldValue: control.value,
            });
            // console.log(`Setting updating Control to ${control.value}`);
            updatedFormValue.push({ name, newValue: control.value, oldValue: control.PreviousValue, control: control });
            // this.updatingControl = control;
          }
        }
      }
    });
    return updatedFormValue;
  }
}
