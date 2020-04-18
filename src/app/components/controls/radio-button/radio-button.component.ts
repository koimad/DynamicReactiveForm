import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FieldConfig } from 'src/app/model/form-item-definition';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent implements OnInit {

  @HostBinding('class') get class(): string { return this.field.columnClass };

  @Input()
  field: FieldConfig;
  @Input()
  group: FormGroup;

  constructor() {}

  ngOnInit() {}
}
