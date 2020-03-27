import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { FieldConfig } from '../../../model/form-item-definition';
import { AbstractControl, FormGroup } from '@angular/forms';
import { componentMapper } from '../component-mapper';
@Directive({
  selector: '[DynamicElement]'
})
export class DynamicElementDirective implements OnInit {
  @Input()
  field: FieldConfig;
  @Input()
  group: FormGroup;

  componentRef: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) {}

  ngOnInit(): void {
    if (this.field) {
      const factory = this.resolver.resolveComponentFactory(
        componentMapper[this.field.controlType]
      );
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.field = this.field;
      this.componentRef.instance.group = this.group;
    }
  }
}
