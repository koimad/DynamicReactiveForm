import {
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';

import { IFieldConfig } from '../../../model/IFieldConfig';
import { componentMapper } from '../component-mapper';
import { UntypedFormGroup } from '@angular/forms';
@Directive({
  selector: '[DynamicElement]'
})
export class DynamicElementDirective implements OnInit {
  @Input()
  field: IFieldConfig;
  @Input()
  group: UntypedFormGroup;

  componentRef: any;

  constructor(
    private container: ViewContainerRef
  ) { }

  ngOnInit(): void {
    if (this.field) {
      this.componentRef = this.container.createComponent(componentMapper[this.field.controlType]);
      this.componentRef.instance.field = this.field;
      this.componentRef.instance.group = this.group;
    }
  }
}
