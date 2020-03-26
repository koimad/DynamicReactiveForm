import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from 'src/app/model/form-item-definition';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-group-box',
  templateUrl: './group-box.component.html',
  styleUrls: ['./group-box.component.css']
})
export class GroupBoxComponent implements OnInit {
  @Input()
  field: FieldConfig;
  @Input()
  group: FormGroup;

  constructor() {}

  ngOnInit() {}
}
