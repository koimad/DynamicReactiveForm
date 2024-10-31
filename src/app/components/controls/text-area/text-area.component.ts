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
  @HostBinding('class') get class(): string {
    return this.field.columnClass;
  }

  @Input()
  field: IFieldConfig;
  @Input()
  group: UntypedFormGroup;

  constructor(public errorMapper: ComponentErrorMapper) {}
}
