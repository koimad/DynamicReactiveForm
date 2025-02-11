import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { IFieldConfig } from 'src/app/model/IFieldConfig';

@Component({
  selector: 'app-group-box',
  templateUrl: './group-box.component.html',
  styleUrls: ['./group-box.component.scss']
})
export class GroupBoxComponent implements OnInit {
  @Input()
  field: IFieldConfig;
  @Input()
  group: UntypedFormGroup;

  @HostBinding('class') get class(): string { return this.field.columnClass };
  constructor() { }

  ngOnInit() { }
}
