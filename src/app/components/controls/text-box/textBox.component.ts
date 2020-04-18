import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FieldConfig } from 'src/app/model/form-item-definition';
import { FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ComponentErrorMapper } from '../component-error-mapper';

@Component({
  selector: 'text-box',
  templateUrl: './textBox.component.html',
  styleUrls: ['./textBox.component.css']
})
export class TextBoxComponent implements OnInit {
  @Input()
  field: FieldConfig;
  @Input()
  group: FormGroup;

  @HostBinding('class') get class(): string { return this.field.columnClass };

  errorMapper: ErrorStateMatcher;

  constructor() {
    this.errorMapper = new ComponentErrorMapper();
  }

  ngOnInit() {}
}
