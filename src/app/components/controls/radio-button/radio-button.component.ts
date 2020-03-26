import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from 'src/app/model/form-item-definition';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent implements OnInit {
  @Input()
  field: FieldConfig;
  @Input()
  group: FormGroup;

  constructor() {}

  ngOnInit() {}
}
