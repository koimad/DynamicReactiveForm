import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from 'src/app/model/form-item-definition';
import { FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ComponentErrorMapper } from '../component-error-mapper';

@Component({
  selector: 'text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.css']
})
export class TextAreaComponent implements OnInit {
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
