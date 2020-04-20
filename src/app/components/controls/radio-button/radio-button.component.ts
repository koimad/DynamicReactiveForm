import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFieldConfig } from 'src/app/model/IFieldConfig';

@Component({
  selector: 'radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit {

  @HostBinding('class') get class(): string { return this.field.columnClass };

  @Input()
  field: IFieldConfig;
  @Input()
  group: FormGroup;

  constructor() { }

  ngOnInit() { }
}
