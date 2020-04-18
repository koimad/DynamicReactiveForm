import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FieldConfig } from 'src/app/model/form-item-definition';
import { FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ComponentErrorMapper } from '../component-error-mapper';

@Component({
  selector: 'combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.css']
})
export class ComboBoxComponent implements OnInit {

  @HostBinding('class') get class(): string { return this.field.columnClass };

  @Input()
  field: FieldConfig;
  @Input()
  group: FormGroup;

  errorMapper: ErrorStateMatcher;

  constructor() {
    this.errorMapper = new ComponentErrorMapper();
  }

  ngOnInit() {}
}
