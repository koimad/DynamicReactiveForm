import { Component, HostBinding, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { IFieldConfig } from 'src/app/model/IFieldConfig';

@Component({
  selector: 'radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent {
  @HostBinding('class') get class(): string {
    return this.field.columnClass;
  }

  @Input()
  field: IFieldConfig;
  @Input()
  group: UntypedFormGroup;
}
