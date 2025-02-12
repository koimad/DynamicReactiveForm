import { Component, forwardRef, HostBinding, Input } from '@angular/core';
import { UntypedFormGroup, ReactiveFormsModule } from '@angular/forms';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { NgClass } from '@angular/common';
import { DynamicElementDirective } from 'src/app/directives/dynamic-element.directive';

@Component({
  selector: 'app-group-box',
  templateUrl: './group-box.component.html',
  styleUrls: ['./group-box.component.scss'],
  imports: [ReactiveFormsModule, NgClass, forwardRef(() => DynamicElementDirective)]
})
export class GroupBoxComponent {
  @Input()
  public field: IFieldConfig;

  @Input()
  public group: UntypedFormGroup;

  @HostBinding('class')
  public get class(): string {
    return this.field.columnClass;
  }
}

