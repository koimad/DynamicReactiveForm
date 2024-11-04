import { Component, HostBinding, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

import { IFieldConfig } from 'src/app/model/IFieldConfig';

import { ComponentErrorMapper } from '../component-error-mapper';

@Component({
  selector: 'text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent {
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
