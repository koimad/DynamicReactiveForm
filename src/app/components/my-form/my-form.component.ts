import { Component, Input } from '@angular/core';
import { FormUpdatedValuesService } from 'src/app/model/form-updated-values.service';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { FormBuilderExtended } from './FormBuilderExtended';
import { MatDialog } from '@angular/material/dialog';
import { DisplayValueChangedComponent } from '../display-value-changed/display-value-changed.component';
import { UntypedFormGroup, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.scss'],
})
export class MyFormComponent {

  @Input('formData')
  public set formData(value: IFieldConfig[]) {
    this._formData = value;
    this.setupForm();
  };

  public get formData(): IFieldConfig[] {
    return this._formData;
  }

  private _formData: IFieldConfig[];

  public rootFormGroup: UntypedFormGroup;
  public fields: Array<IFieldConfig>;
  public submitData = [];
  public jsonSubmitData: string;

  constructor(
    private _formBuilder: FormBuilderExtended,
    private _updatedFormValueService: FormUpdatedValuesService,
    private _dialogue: MatDialog
  ) { }

  private setupForm(): void {

    try {
      this.rootFormGroup = this._formBuilder.group({});

      this.createGroup(this.rootFormGroup, this._formData);
      let settingValue = false;

      this.rootFormGroup.valueChanges.subscribe((f) => {
        let changes = this._updatedFormValueService.getUpdatedValues(this.rootFormGroup);
        console.log(changes);

        for (let i = 0; i < 1000000; i++) {
          let c = 0;
          c++;
        }

        changes.forEach(c => {
          if (!settingValue && c.name.includes('Age')) {
            settingValue = true;
            const dialogRef = this._dialogue.open(DisplayValueChangedComponent, {
              width: '400px',
              height: '300px',
              data: {
                oldValue: c.oldValue,
                newValue: c.newValue,
                label: c.name.replace(/[0-9]/g, '')
              }
            });

            dialogRef.afterClosed().subscribe(result => {
              if (result) {
                c.newValue = c.oldValue;
                c.control.setValue(c.oldValue);
              }
              settingValue = false;

            });
          }

        });
      });


    } catch (e) {
      console.log(e);
    }
  }


  private createGroup(formGroup: UntypedFormGroup, fields: Array<IFieldConfig>): void {

    fields.forEach((field) => {
      if (field.controlType === 'group' || field.controlType === 'formTab') {
        if (field.children) {
          field.group = formGroup;
          const childGroup = this._formBuilder.group({});
          this.createGroup(childGroup, field.children);
          formGroup.addControl(field.key, childGroup);
        }
      } else if (field.controlType === 'cudGrid') {
        const childGroup = this._formBuilder.group(
          [field.key],
          this.buildValidators(field.validators)
        );
        formGroup.addControl(field.key, childGroup);
        field.group = childGroup;
      } else if (field.controlType === 'dragDrop') {
        field.group = formGroup;
      } else {
        field.group = formGroup;
        formGroup.addControl(
          field.key,
          this._formBuilder.control(
            field.value,
            this.buildValidators(field.validators)
          )
        );
      }
    });
  }


  private buildValidators(validations: any[]): ValidatorFn {
    let result: ValidatorFn;
    const validatorList = [];
    if (validations && validations.length > 0) {
      validations.forEach((fieldValidator) => {
        validatorList.push(fieldValidator.validator);
        result = Validators.compose(validatorList);
      });
    }
    return result;
  }


  public submit(): void {
    this.submitData = this._updatedFormValueService.getnerateChangedControlString();
    // let t = this._updatedFormValueService.getChangeCommands(this.rootFormGroup);
    // console.log(t)
    // this.jsonSubmitData = JSON.stringify(t);
  }
}

