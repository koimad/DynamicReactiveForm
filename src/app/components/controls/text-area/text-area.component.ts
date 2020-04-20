import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { ComponentErrorMapper } from '../component-error-mapper';

@Component({
  selector: 'text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent implements OnInit {
  @HostBinding('class') get class(): string { return this.field.columnClass };

  @Input()
  field: IFieldConfig;
  @Input()
  group: FormGroup;

  constructor(public errorMapper: ComponentErrorMapper) {

  }

  ngOnInit() { }
}
