import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormArray, UntypedFormGroup } from '@angular/forms';
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
}
