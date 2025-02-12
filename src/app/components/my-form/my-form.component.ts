import { Component, forwardRef, Input, ViewChild } from '@angular/core';
import { FormUpdatedValuesService } from 'src/app/model/form-updated-values.service';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { FormBuilderExtended } from './FormBuilderExtended';
import { MatDialog } from '@angular/material/dialog';
import { DisplayValueChangedComponent } from '../display-value-changed/display-value-changed.component';
import {
  FormGroupDirective,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
  ValueChangeEvent,
  ReactiveFormsModule
} from '@angular/forms';
import { FormControlExtended } from './FormControlExtended';
import { filter } from 'rxjs/operators';
import { IFieldValidator } from 'src/app/model/IFieldValidator';
import { NgClass } from '@angular/common';
import { MatTabGroup, MatTab, MatTabLabel } from '@angular/material/tabs';

import { JsonPrettyPrintPipe } from './jsonPrettyPrint';
import { DynamicElementDirective } from 'src/app/directives/dynamic-element.directive';

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.scss'],
  imports: [
    NgClass,
    ReactiveFormsModule,
    MatTabGroup,
    MatTab,
    MatTabLabel,
    JsonPrettyPrintPipe,
    forwardRef(() => DynamicElementDirective)
  ]
})
export class MyFormComponent {
  private _formData: IFieldConfig[];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _initialValues: any;

  @ViewChild(FormGroupDirective)
  private _form: FormGroupDirective;

  public rootFormGroup: UntypedFormGroup;

  public fields: IFieldConfig[];

  public submitData: object;

  public jsonSubmitData: string;

  public constructor(
    private _formBuilder: FormBuilderExtended,
    private _updatedFormValueService: FormUpdatedValuesService,
    private _dialogue: MatDialog
  ) {}

  private setupForm(): void {
    try {
      this.rootFormGroup = this._formBuilder.group({});
      this.rootFormGroup.events.pipe(filter(e => e instanceof ValueChangeEvent)).subscribe(f => {
        if (f.source.dirty) {
          if (f.source instanceof FormControlExtended) {
            const control: FormControlExtended = f.source;

            const parent = control.parent;

            for (const key in parent.controls) {
              if (control === parent.controls[key]) {
                if (key == 'ParentAge') {
                  const dialogRef = this._dialogue.open(DisplayValueChangedComponent, {
                    width: '400px',
                    height: '300px',
                    data: {
                      oldValue: control.PreviousValue,
                      newValue: control.value,
                      label: key.replace(/[0-9]/g, '')
                    }
                  });

                  dialogRef.afterClosed().subscribe(result => {
                    if (result) {
                      f.source.setValue(control.PreviousValue, { emitEvent: false });
                    }
                  });
                }
              }
            }
          }
        }
      });

      this.createGroup(this.rootFormGroup, this._formData);
      this._initialValues = this.rootFormGroup.value;
    } catch (e) {
      console.error(e);
    }
  }

  private createGroup(formGroup: UntypedFormGroup, fields: IFieldConfig[]): void {
    fields.forEach(field => {
      if (field.controlType === 'group' || field.controlType === 'formTab') {
        if (field.children) {
          field.group = formGroup;
          const childGroup = this._formBuilder.group({});
          this.createGroup(childGroup, field.children);
          formGroup.addControl(field.key, childGroup, { emitEvent: false });
        }
      } else if (field.controlType === 'cudGrid') {
        const childGroup = this._formBuilder.group([field.key], this.buildValidators(field.validators));
        formGroup.addControl(field.key, childGroup, { emitEvent: false });
        field.group = childGroup;
      } else if (field.controlType === 'dragDrop') {
        field.group = formGroup;
      } else {
        field.group = formGroup;
        formGroup.addControl(field.key, this._formBuilder.control(field.value, this.buildValidators(field.validators)));
      }
    });
  }

  private buildValidators(validations: IFieldValidator[]): ValidatorFn {
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

  public reset() {
    //this.rootFormGroup.reset(this._initialValues, { onlySelf: false });
    this._form.resetForm(this._initialValues);
    //this.rootFormGroup.reset(this.rootFormGroup.reset getRawValue(), { onlySelf: false, emitEvent: false });
  }

  @Input()
  public set formData(value: IFieldConfig[]) {
    this._formData = value;
    this.setupForm();
  }

  public get formData(): IFieldConfig[] {
    return this._formData;
  }

  public submit(): void {
    const commands = this._updatedFormValueService.getnerateChangedControlString(this.rootFormGroup);
    this.submitData = commands; // JSON.stringify(commands,undefined,2);
  }
}

