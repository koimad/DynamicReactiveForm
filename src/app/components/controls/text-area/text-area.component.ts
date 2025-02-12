import { Component, HostBinding, Input } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';

import { IFieldConfig } from 'src/app/model/IFieldConfig';

import { ComponentErrorMapper } from '../component-error-mapper';
import { MatFormField, MatLabel, MatError } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'text-area',
    templateUrl: './text-area.component.html',
    styleUrls: ['./text-area.component.scss'],
    imports: [MatFormField, ReactiveFormsModule, MatLabel, MatInput, MatError]
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
