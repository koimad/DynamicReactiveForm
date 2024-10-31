import { Component, HostBinding, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { ComponentErrorMapper } from './../component-error-mapper';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent {
  @HostBinding('class') get class(): string {
    return this.field.columnClass;
  }
  errorStateMatcher: ErrorStateMatcher;

  @Input()
  field: IFieldConfig;
  @Input()
  group: UntypedFormGroup;

  constructor(public errorMapper: ComponentErrorMapper) {}
}
