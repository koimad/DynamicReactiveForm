import { ComponentErrorMapper } from './../component-error-mapper';
import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FieldConfig } from 'src/app/model/form-item-definition';
import { FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css']
})
export class DatePickerComponent implements OnInit {

  @HostBinding('class') get class(): string { return this.field.columnClass };
  errorMapper: ErrorStateMatcher;

  @Input()
  field: FieldConfig;
  @Input()
  group: FormGroup;

  constructor() {
    this.errorMapper = new ComponentErrorMapper();
  }

  ngOnInit() {}
}
