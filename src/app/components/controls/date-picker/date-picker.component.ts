import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { ComponentErrorMapper } from './../component-error-mapper';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  @HostBinding('class') get class(): string { return this.field.columnClass };
  errorStateMatcher: ErrorStateMatcher;

  @Input()
  field: IFieldConfig;
  @Input()
  group: FormGroup;

  constructor(public errorMapper: ComponentErrorMapper) {
  }

  ngOnInit() {
  }


}
