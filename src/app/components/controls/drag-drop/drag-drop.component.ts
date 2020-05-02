import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup, ValidationErrors } from '@angular/forms';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { FormBuilderExtended } from './../../my-form/FormBuilderExtended';

import { CdkDrag, CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop'

@Component({
  selector: 'drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {
  private _destinationArray: FormArray;

  @HostBinding('class') get class(): string { return this.field.columnClass };

  private _field: IFieldConfig;
  private _group: FormGroup;

  @Input('field')
  set field(value: IFieldConfig) {
    this._field = value;
    this.setupControl();
  }

  get field(): IFieldConfig {
    return this._field;
  }

  @Input('group')
  set group(value: FormGroup) {
    this._group = value;
    this.setupControl();
  }

  get group(): FormGroup {
    return this._group;
  }

  constructor(private formBuilder: FormBuilderExtended) {
    this.destination = [];
    this.source = [];
  }

  private setupControl() {
    if (this._group && this._field) {
      this.setupSourceData();
      this.setupDestinationData();
    }
  }

  public source: Array<string>;

  public destination: Array<string>;

  public errors(): ValidationErrors {
    return this._destinationArray.errors ?? [];
  }

  public drop(event: CdkDragDrop<Array<string>>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      if (event.previousContainer.id === 'DestinationList') {

        this.destination.splice(event.previousIndex, 1);
        console.log(this._destinationArray.dirty);

        this._destinationArray.removeAt(event.previousIndex);
        // console.log(this._destinationArray.dirty);
        // console.log(this._destinationArray);
        // console.log(this.group.dirty);
      } else {
        copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
        this._destinationArray.push(this.formBuilder.control(event.item.data));

      }
    }
  }

  public toDoCanDrop(item: CdkDrag<string>) {
    return true;
  }

  public ngOnInit() {

  }

  private setupSourceData() {
    // this could be populated from an ngrx store rather than passing in.
    // other option is to make the options field an observable as well.
    this.source = [...this._field.options ?? []]
  }

  private setupDestinationData() {
    this.destination = [...this._field.value ?? []]
    const controls = [];

    this.destination.forEach(f => {
      controls.push(this.formBuilder.control(f));
    });
    this._destinationArray = this.formBuilder.array(controls, this._field.validators.map(f => f.validator));


    this.group.addControl(this._field.key, this._destinationArray);

  }

}

