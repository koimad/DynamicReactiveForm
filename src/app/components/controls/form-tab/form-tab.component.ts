import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { IFieldConfig } from 'src/app/model/IFieldConfig';

@Component({
  selector: 'form-tab',
  templateUrl: './form-tab.component.html',
  styleUrls: ['./form-tab.component.scss']
})
export class FormTabComponent implements OnInit {
  @Input()
  field: IFieldConfig;
  @Input()
  group: UntypedFormGroup;

  constructor() { }

  ngOnInit() { }
}
