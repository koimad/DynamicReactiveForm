import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { IFieldConfig } from 'src/app/model/IFieldConfig';
import { ComponentErrorMapper } from '../component-error-mapper';

import { CdkDrag, CdkDragDrop, copyArrayItem, moveItemInArray } from '@angular/cdk/drag-drop'

@Component({
  selector: 'drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent implements OnInit {
  @HostBinding('class') get class(): string { return this.field.columnClass };

  @Input()
  field: IFieldConfig;
  @Input()
  group: FormGroup;

  errorMapper: ErrorStateMatcher;

  constructor() {
    this.errorMapper = new ComponentErrorMapper();
  }


  public todo = [
    'Beans',
    'Carrots',
    'Potatoes',
    'Apples',
    'Oranges',
  ];

  public done: Array<any> = [
  ];

  drop(event: CdkDragDrop<string[]>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      if (event.previousContainer.id === 'DestinationList') {

        this.done.splice(event.previousIndex, 1);

      } else {
        copyArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
      }
    }
  }

  toDoCanDrop(item: CdkDrag<number>) {
    return true;
  }

  ngOnInit() { }
}
