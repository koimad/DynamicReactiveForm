import { Component, HostBinding, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { ComponentErrorMapper } from '../component-error-mapper';

@Component({
  selector: 'combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.scss']
})
export class ComboBoxComponent {
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
