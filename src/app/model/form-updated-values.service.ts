import { ComponentFactoryResolver, Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { FormArrayExtended } from '../components/my-form/FormArrayExtended';



@Injectable({
  providedIn: 'root',
})
export class FormUpdatedValuesService {
  constructor() { }
  private _updatedValues = new Map<string, { control: any; oldValue: any }>();

  public getnerateChangedControlString(): string {
    let result = '';
    this._updatedValues.forEach((c, k, m) => {
      console.log(c);
      console.log('adding flat');
      const a = c.control as FormArrayExtended;
      if (c.control instanceof FormArrayExtended) {
        console.log('FormArrayExtended');
        console.log(a);

        result += `Property : ${k}    `;
        result += `Added     `;
        a.getChanges().added.forEach(control => {
          result += `NewValue : ${JSON.stringify(control.value)}     `;
        });

        result += `Removed     `;
        a.getChanges().removed.forEach(control => {
          result += `NewValue : ${JSON.stringify(control.value)}     `;
        });

        result += `Modfifed     `;
        a.getChanges().modified.forEach(control => {
          result += `NewValue : ${JSON.stringify(control.value)}     `;
        });

      } else {
        result += `Property : ${k} OldValue : ${JSON.stringify(
          c.control.originalValue
        )} NewValue : ${JSON.stringify(c.control.value)}`;
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
          this.getUpdatedValues(control).forEach((f) =>
            updatedFormValue.push(f)
          );
        } else {
          let existingChange = false;

          this._updatedValues.forEach((c, k, m) => {
            // console.log(`${k}   ${name}    ${c.oldValue}    ${control.value}`);

            if (k === name && c.oldValue === control.value) {
              // console.log(`${k}   ${name}`);
              existingChange = true;
            }
          });

          if (!existingChange) {
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
