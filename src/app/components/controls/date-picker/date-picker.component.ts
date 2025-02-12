import { Component, HostBinding, Input } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { ComponentErrorMapper } from './../component-error-mapper';
import { MatFormField, MatSuffix, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatDatepickerInput, MatDatepickerToggle, MatDatepicker } from '@angular/material/datepicker';

@Component({
    selector: 'date-picker',
    templateUrl: './date-picker.component.html',
    styleUrls: ['./date-picker.component.scss'],
    imports: [MatFormField, ReactiveFormsModule, MatInput, MatDatepickerInput, MatDatepickerToggle, MatSuffix, MatDatepicker, MatError]
})
export class DatePickerComponent {
  public errorStateMatcher: ErrorStateMatcher;

  @Input()
  public field: IFieldConfig;

  @Input()
  public group: UntypedFormGroup;

  public constructor(public errorMapper: ComponentErrorMapper) {}

  @HostBinding('class')
  public get class(): string {
    return this.field.columnClass;
  }
}
