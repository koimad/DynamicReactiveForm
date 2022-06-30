import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { ComponentErrorMapper } from '../component-error-mapper';

@Component({
  selector: 'combo-box',
  templateUrl: './combo-box.component.html',
  styleUrls: ['./combo-box.component.scss']
})
export class ComboBoxComponent implements OnInit {

  @HostBinding('class') get class(): string { return this.field.columnClass };

  @Input()
  field: IFieldConfig;
  @Input()
  group: UntypedFormGroup;

  constructor(public errorMapper: ComponentErrorMapper) {
  }

  public ngOnInit() { }
}
