import { Component, HostBinding, Input } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { IFieldConfig } from 'src/app/model/IFieldConfig';

@Component({
    selector: 'app-group-box',
    templateUrl: './group-box.component.html',
    styleUrls: ['./group-box.component.scss'],
    standalone: false
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
