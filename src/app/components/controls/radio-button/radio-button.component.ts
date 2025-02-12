import { Component, HostBinding, Input } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatRadioGroup, MatRadioButton } from '@angular/material/radio';

@Component({
    selector: 'radio-button',
    templateUrl: './radio-button.component.html',
    styleUrls: ['./radio-button.component.scss'],
    imports: [MatFormField, ReactiveFormsModule, MatLabel, MatInput, MatRadioGroup, MatRadioButton]
})
export class RadioButtonComponent {
  @Input()
  public field: IFieldConfig;

  @Input()
  public group: UntypedFormGroup;

  @HostBinding('class')
  public get class(): string {
    return this.field.columnClass;
  }
}
