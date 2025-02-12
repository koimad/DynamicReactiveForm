import { Component, forwardRef, Input } from '@angular/core';

import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';

import { IFieldConfig } from 'src/app/model/IFieldConfig';

import { DynamicElementDirective } from 'src/app/directives/dynamic-element.directive';

@Component({
  selector: 'form-tab',

  templateUrl: './form-tab.component.html',

  styleUrls: ['./form-tab.component.scss'],

  imports: [ReactiveFormsModule, forwardRef(() => DynamicElementDirective)]
})
export class FormTabComponent {
  @Input()
  public field: IFieldConfig;

  @Input()
  public group: UntypedFormGroup;
}

