import { Component, HostBinding, Input } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { ComponentErrorMapper } from '../component-error-mapper';
import { MatFormField, MatError } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';

@Component({
    selector: 'combo-box',
    templateUrl: './combo-box.component.html',
    styleUrls: ['./combo-box.component.scss'],
    imports: [MatFormField, ReactiveFormsModule, MatSelect, MatOption, MatError]
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
