import { ErrorStateMatcher } from '@angular/material/core';
import { Injectable } from "@angular/core";
import { FormGroupDirective, NgForm, UntypedFormControl } from '@angular/forms';

@Injectable()
export class ComponentErrorMapper implements ErrorStateMatcher {
  isErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return control && control.invalid;
  }
}
