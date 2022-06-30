import {
  ComponentFactoryResolver,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { IFieldConfig } from '../../../model/IFieldConfig';
import { componentMapper } from '../component-mapper';
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
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

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
