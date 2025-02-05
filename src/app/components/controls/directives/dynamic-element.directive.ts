import { Directive, Input, OnInit, ViewContainerRef } from '@angular/core';

import { IFieldConfig } from '../../../model/IFieldConfig';

import { componentMapper } from '../component-mapper';

import { UntypedFormGroup } from '@angular/forms';

@Directive({
    selector: '[DynamicElement]',
    standalone: false
})
export class DynamicElementDirective implements OnInit {
  private _componentRef: any;

  @Input()
  public field: IFieldConfig;

  @Input()
  public group: UntypedFormGroup;

  public constructor(private container: ViewContainerRef) {}

  public ngOnInit(): void {
    if (this.field) {
      this._componentRef = this.container.createComponent(componentMapper[this.field.controlType]);

      this._componentRef.instance.field = this.field;

      this._componentRef.instance.group = this.group;
    }
  }
}
