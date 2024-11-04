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
  public field: IFieldConfig;

  @Input()
  public group: UntypedFormGroup;

  public constructor(public errorMapper: ComponentErrorMapper) {}

  @HostBinding('class')
  public get class(): string {
    return this.field.columnClass;
  }
}
