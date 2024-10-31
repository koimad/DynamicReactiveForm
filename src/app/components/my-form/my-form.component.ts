import { Component, Input } from '@angular/core';
import { FormUpdatedValuesService } from 'src/app/model/form-updated-values.service';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { FormBuilderExtended } from './FormBuilderExtended';
import { MatDialog } from '@angular/material/dialog';
import { DisplayValueChangedComponent } from '../display-value-changed/display-value-changed.component';
import { UntypedFormGroup, ValidatorFn, Validators, ValueChangeEvent } from '@angular/forms';
import { FormControlExtended } from './FormControlExtended';
import { filter } from 'rxjs/operators';
//import { IFieldValidator } from 'src/app/model/IFieldValidator';

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.scss']
})
export class MyFormComponent {
  reset() {
    this.rootFormGroup.reset();
  }

  @Input()
  public set formData(value: IFieldConfig[]) {
    this._formData = value;
    this.setupForm();
  }

  public get formData(): IFieldConfig[] {
    return this._formData;
  }

  private _formData: IFieldConfig[];

  public rootFormGroup: UntypedFormGroup;
  public fields: IFieldConfig[];
  public submitData: object;
  public jsonSubmitData: string;

  constructor(
    private _formBuilder: FormBuilderExtended,
    private _updatedFormValueService: FormUpdatedValuesService,
    private _dialogue: MatDialog
  ) {}

  private setupForm(): void {
    try {
      this.rootFormGroup = this._formBuilder.group({});
      this.rootFormGroup.events.pipe(filter(e => e instanceof ValueChangeEvent)).subscribe(f => {
        console.log(f);

        if (f.source.dirty) {
          if (f.source instanceof FormControlExtended) {
            const control: FormControlExtended = f.source;

            if (control.Key == 'Age') {
              const dialogRef = this._dialogue.open(DisplayValueChangedComponent, {
                width: '400px',
                height: '300px',
                data: {
                  oldValue: control.PreviousValue,
                  newValue: control.value,
                  label: control.Key.replace(/[0-9]/g, '')
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
      });

      this.createGroup(this.rootFormGroup, this._formData);
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
        formGroup.addControl(
          field.key,
          this._formBuilder.controlWithkey(field.key, field.value, this.buildValidators(field.validators))
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
    const commands = this._updatedFormValueService.getnerateChangedControlString(this.rootFormGroup);
    this.submitData = commands; // JSON.stringify(commands,undefined,2);
  }
}
