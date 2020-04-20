import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { ComponentErrorMapper } from '../component-error-mapper';

@Component({
  selector: 'text-box',
  templateUrl: './textBox.component.html',
  styleUrls: ['./textBox.component.scss']
})
export class TextBoxComponent implements OnInit {
  @Input()
  field: IFieldConfig;
  @Input()
  group: FormGroup;

  @HostBinding('class') get class(): string { return this.field.columnClass };

  constructor(public errorMapper: ComponentErrorMapper) {

  }

  ngOnInit() { }
}
