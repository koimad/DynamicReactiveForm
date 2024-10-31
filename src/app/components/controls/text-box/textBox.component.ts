import { Component, HostBinding, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { ComponentErrorMapper } from '../component-error-mapper';

@Component({
  selector: 'text-box',
  templateUrl: './textBox.component.html',
  styleUrls: ['./textBox.component.scss']
})
export class TextBoxComponent {
  @Input()
  field: IFieldConfig;
  @Input()
  group: UntypedFormGroup;

  @HostBinding('class') get class(): string {
    return this.field.columnClass;
  }

  constructor(public errorMapper: ComponentErrorMapper) {}
}
