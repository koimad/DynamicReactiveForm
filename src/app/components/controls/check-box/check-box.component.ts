import { Component, OnInit, Input } from '@angular/core';
import { FieldConfig } from 'src/app/model/form-item-definition';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {
  private fieldInternal: FieldConfig;
  private index = 0;

  @Input('field')
  set field(value: FieldConfig) {
    this.fieldInternal = value;
    this.controlValue = this.fieldInternal.value;
    console.log(`Setting Field = ${this.controlValue}`);

    this.index = this.fieldInternal.options.indexOf(this.controlValue);
  }

  get field(): FieldConfig {
    return this.fieldInternal;
  }

  @Input()
  group: FormGroup;

  controlValue: any;
  constructor() {}

  ngOnInit() {}

  onClick() {
    this.controlValue = this.fieldInternal.options[++this.index % this.fieldInternal.options.length];

    this.group.get(this.fieldInternal.key).setValue(this.controlValue);

    if (this.group.get(this.fieldInternal.key).value !== this.fieldInternal.value) {
      this.group.get(this.fieldInternal.key).markAsDirty();
    } else {
      this.group.get(this.fieldInternal.key).reset();
    }

    console.log(`Changed To Value = ${this.group.get(this.fieldInternal.key).value}`);
    console.log(`Has Valudation Error = ${this.group.get(this.fieldInternal.key).errors}`);
  }
}
