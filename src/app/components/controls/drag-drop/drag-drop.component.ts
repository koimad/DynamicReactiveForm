import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input } from '@angular/core';

import { UntypedFormArray, UntypedFormGroup, ValidationErrors } from '@angular/forms';

import { IFieldConfig } from 'src/app/model/IFieldConfig';

import { FormBuilderExtended } from './../../my-form/FormBuilderExtended';

import {
  CdkDrag,
  CdkDragDrop,
  moveItemInArray,
  CdkDropListGroup,
  CdkDropList,
  CdkDragPlaceholder,
  CdkDragPreview
} from '@angular/cdk/drag-drop';

import { DragDropContainer } from 'src/app/model/DragDropContainer';

import { FormGroupExtended } from '../../my-form/FormGroupExtended';

@Component({
  selector: 'drag-drop',

  templateUrl: './drag-drop.component.html',

  styleUrls: ['./drag-drop.component.scss'],

  imports: [CdkDropListGroup, CdkDropList, CdkDrag, CdkDragPlaceholder, CdkDragPreview]
})
export class DragDropComponent {
  private _destinationArray: UntypedFormArray;

  private _field: IFieldConfig;

  private _group: UntypedFormGroup;

  public source: DragDropContainer[];

  public destination: DragDropContainer[];

  public constructor(private _formBuilder: FormBuilderExtended, private _ref: ChangeDetectorRef) {
    this.destination = [];

    this.source = [];
  }

  private setupControl() {
    if (this._group && this._field) {
      this.setupSourceData();

      this.setupDestinationData();

      (this._group as FormGroupExtended).entityType = this._field.entityType;
    }
  }

  private setupSourceData() {
    // this could be populated from an ngrx store rather than passing in.

    // other option is to make the options field an observable as well.

    if (this._field.options) {
      this.source = this._field.options.map((value, index) => {
        return new DragDropContainer(index, value);
      }) as DragDropContainer[];
    } else {
      this.source = [];
    }
  }

  private setupDestinationData() {
    this.destination = (this._field.value as []).map((value, index) => {
      return new DragDropContainer(index, value);
    }) as DragDropContainer[];

    const controls = [];

    this.destination.forEach(f => {
      controls.push(this._formBuilder.control(f));
    });

    this._destinationArray = this._formBuilder.array(
      controls,

      this._field.validators.map(f => f.validator)
    );

    this.group.addControl(this._field.key, this._destinationArray, { emitEvent: false });
  }

  @HostBinding('class')
  public get class(): string {
    return this.field.columnClass;
  }

  @Input()
  public set field(value: IFieldConfig) {
    this._field = value;

    this.setupControl();
  }

  public get field(): IFieldConfig {
    return this._field;
  }

  @Input()
  public set group(value: UntypedFormGroup) {
    this._group = value;

    this.setupControl();
  }

  public get group(): UntypedFormGroup {
    return this._group;
  }

  public errors(): ValidationErrors {
    return this._destinationArray.errors ?? [];
  }

  public drop(event: CdkDragDrop<DragDropContainer[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.previousContainer.id === 'DestinationList') {
        this.destination.splice(event.previousIndex, 1);

        this._destinationArray.removeAt(event.previousIndex);
      } else {
        console.log(event.currentIndex);
        event.container.data.splice(
          event.currentIndex,
          0,
          new DragDropContainer(event.currentIndex, event.item.data.value)
        );

        let i = 0;
        event.container.data.forEach(item => {
          item.key = i++;
        });

        this._destinationArray.push(this._formBuilder.control(event.item.data));
      }
    }
  }

  public toDoCanDrop(item: CdkDrag<DragDropContainer>) {
    //console.info(item);

    return true;
  }
}

