import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { FieldConfig } from 'src/app/model/form-item-definition';
import { FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { _countGroupLabelsBeforeOption } from '@angular/material/core';

@Component({
  selector: 'check-box',
  templateUrl: './check-box.component.html',
  styleUrls: ['./check-box.component.css']
})
export class CheckBoxComponent implements OnInit {

  @HostBinding('class') get class(): string { return this.field.columnClass };

  @Input('field')
  set field(value: FieldConfig) {
    this.internalField = value;
    this.isIndeterniate = value.value === null;
    this.oldValue = value.value;
    if (this.internalGroup) {
      this.updateControl();
    }
  }

  get field(): FieldConfig {
    return this.internalField;
  }

  @Input('group')
  set group(value:FormGroup){
    this.internalGroup = value;
    if(this.internalField)
    {
      this.updateControl();
    }
  }
  get group(): FormGroup{
    return this.internalGroup;
  }

  constructor() {

  }
  control: AbstractControl;
  isIndeterniate : boolean;
  private internalChange=false;
  private internalField: FieldConfig;
  private index = 0;
  private internalGroup: FormGroup;
  private oldValue : any;

  updateControl() {
    this.control = this.internalGroup.get(this.internalField.key);
    this.control.valueChanges.subscribe((value) => this.valueChanges(value));
  }

  private valueChanges(newValue: any): void {
    console.log(`Changing Value To ${newValue}`);

    if (this.internalChange === false)
    {
      this.internalChange = true;
      this.isIndeterniate = false;


      let nextValueIndex = this.internalField.options.indexOf(this.oldValue) + 1;


      if (nextValueIndex >= this.internalField.options.length)
      {
        nextValueIndex = 0;
      }

      console.log(`next value is ${nextValueIndex}  ${this.internalField.options[nextValueIndex]}`)

      newValue = this.internalField.options[nextValueIndex];
      this.control.setValue(newValue);
      this.isIndeterniate = newValue === null;

      this.internalChange = false;

      this.oldValue = newValue;
      console.log(`setting old value to ${this.oldValue}`);
    }
  }

  ngOnInit() {}

  onClick() {
    console.log(`Changed To Value = ${this.group.get(this.field.key).value}`);
    console.log(`Has Valudation Error = ${this.group.get(this.field.key).errors}`);
  }
}
