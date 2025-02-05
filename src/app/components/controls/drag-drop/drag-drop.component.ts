import { Component, HostBinding, Input } from '@angular/core';
import { UntypedFormArray, UntypedFormGroup, ValidationErrors } from '@angular/forms';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { FormBuilderExtended } from './../../my-form/FormBuilderExtended';
import { CdkDrag, CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
    selector: 'drag-drop',
    templateUrl: './drag-drop.component.html',
    styleUrls: ['./drag-drop.component.scss'],
    standalone: false
})
export class DragDropComponent {
  private _destinationArray: UntypedFormArray;

  private _field: IFieldConfig;

  private _group: UntypedFormGroup;

  public source: object[];

  public destination: string[];

  public constructor(private _formBuilder: FormBuilderExtended) {
    this.destination = [];
    this.source = [];
  }

  private setupControl() {
    if (this._group && this._field) {
      this.setupSourceData();
      this.setupDestinationData();
    }
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

  public drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      if (event.previousContainer.id === 'DestinationList') {
        this.destination.splice(event.previousIndex, 1);

        this._destinationArray.removeAt(event.previousIndex);
      } else {
        copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
        this._destinationArray.push(this._formBuilder.control(event.item.data));
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public toDoCanDrop(item: CdkDrag<string>) {
    return true;
  }
}
