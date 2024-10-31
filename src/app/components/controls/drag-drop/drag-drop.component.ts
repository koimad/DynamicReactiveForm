import { Component, HostBinding, Input } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup, ValidationErrors } from '@angular/forms';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { FormBuilderExtended } from './../../my-form/FormBuilderExtended';

import { CdkDrag, CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent {
  private _destinationArray: UntypedFormArray;

  @HostBinding('class') get class(): string {
    return this.field.columnClass;
  }

  private _field: IFieldConfig;
  private _group: UntypedFormGroup;

  @Input()
  set field(value: IFieldConfig) {
    this._field = value;
    this.setupControl();
  }

  get field(): IFieldConfig {
    return this._field;
  }

  @Input()
  set group(value: UntypedFormGroup) {
    this._group = value;
    this.setupControl();
  }

  get group(): UntypedFormGroup {
    return this._group;
  }

  constructor(private _formBuilder: FormBuilderExtended) {
    this.destination = [];
    this.source = [];
  }

  private setupControl() {
    if (this._group && this._field) {
      this.setupSourceData();
      this.setupDestinationData();
    }
  }

  public source: object[];

  public destination: string[];

  public errors(): ValidationErrors {
    return this._destinationArray.errors ?? [];
  }

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.previousContainer.id === 'DestinationList') {
        this.destination.splice(event.previousIndex, 1);

        this._destinationArray.removeAt(event.previousIndex);
      } else {
        copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        this._destinationArray.push(this._formBuilder.controlWithkey('name', event.item.data));
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public toDoCanDrop(item: CdkDrag<string>) {
    return true;
  }

  private setupSourceData() {
    // this could be populated from an ngrx store rather than passing in.
    // other option is to make the options field an observable as well.
    this.source = [...(this._field.options ?? [])];
  }

  private setupDestinationData() {
    this.destination = [...((this._field.value as []) ?? [])];
    const controls = [];

    this.destination.forEach(f => {
      controls.push(this._formBuilder.control(f));
    });
    this._destinationArray = this._formBuilder.arrayWithKey(
      this._field.key,
      controls,
      this._field.validators.map(f => f.validator)
    );

    this.group.addControl(this._field.key, this._destinationArray, { emitEvent: false });
  }
}
