import { Injectable } from '@angular/core';
import { AbstractControl, UntypedFormGroup } from '@angular/forms';

import { FormArrayExtended } from '../components/my-form/FormArrayExtended';

import { FormControlExtended } from '../components/my-form/FormControlExtended';

import { FormGroupExtended } from '../components/my-form/FormGroupExtended';

import { CommandDto } from '../model/commands/CommandDto';

import { CommandOperationDto } from '../model/commands/CommandOperationDto';

import { DragDropContainer } from '../model/DragDropContainer';

import { EntityTypeDto } from '../model/commands/EntityTypeDto';

import { ChangedPropertyValueDto } from '../model/commands/ChangedPropertyValueDto';

@Injectable({
  providedIn: 'root'
})
export class FormUpdatedValuesService {
  private getFormGroupChanges(group: FormGroupExtended, command: CommandDto, handleInserts = false) {
    for (const field in group.controls) {
      const control = group.get(field);

      if (control.dirty || handleInserts) {
        if (control instanceof FormControlExtended) {
          this.getControlValue(control, command);

          command.properties[field] = control.value;
        } else if (control instanceof FormGroupExtended) {
          this.getFormGroupChanges(control, command);
        } else if (control instanceof FormArrayExtended) {
          const formArray = control as FormArrayExtended;

          const commands: CommandDto[] = [];

          for (const key in control.parent.controls) {
            if (control === control.parent.controls[key]) {
              command.associatedCommands[key] = commands;

              break;
            }
          }

          const changes = formArray.getChanges();

          changes.added.forEach(rowControl => {
            const itemCommand: CommandDto = new CommandDto();

            itemCommand.correlationId = command.correlationId;

            commands.push(itemCommand);

            itemCommand.operation = CommandOperationDto.Create;

            this.getEntityType(rowControl, itemCommand);

            if (rowControl instanceof FormGroupExtended) {
              this.getFormGroupChanges(rowControl, itemCommand, true);
            } else if (rowControl instanceof FormControlExtended) {
              this.getControlValue(rowControl, itemCommand);
            }
          });

          changes.modified.forEach(rowControl => {
            const itemCommand: CommandDto = new CommandDto();

            itemCommand.correlationId = command.correlationId;

            commands.push(itemCommand);

            this.getEntityType(rowControl, itemCommand);

            itemCommand.operation = CommandOperationDto.Update;

            if (rowControl instanceof FormGroupExtended) {
              this.getFormArrayGroupChanges(rowControl, itemCommand);
            }
          });

          changes.deleted.forEach(rowControl => {
            const itemCommand: CommandDto = new CommandDto();

            itemCommand.correlationId = command.correlationId;

            commands.push(itemCommand);

            this.getEntityType(rowControl, itemCommand);

            itemCommand.operation = CommandOperationDto.Delete;

            if (rowControl instanceof FormGroupExtended) {
              this.getFormGroupDeletionChanges(rowControl, itemCommand);
            } else if (rowControl instanceof FormControlExtended) {
              this.getFormControlDeletionChanges(rowControl, itemCommand);
            }
          });
        }
      }
    }
  }

  private getControlValue(control: FormControlExtended, command: CommandDto): void {
    if (control.value instanceof DragDropContainer) {
      Object.keys(control.value.value).forEach(key => {
        if (key === 'Id') {
          command.entityId = control.value.value[key];
        } else {
          command.properties[key] = control.value.value[key];
        }
      });
    } else {
      for (const key in control.parent.controls) {
        if (control.parent.controls[key] === control) {
          command.properties[key] = control.value;

          break;
        }
      }
    }
  }

  private getFormArrayGroupChanges(group: FormGroupExtended, command: CommandDto) {
    command.entityId = group.controls['Id'].value;

    for (const field in group.controls) {
      const control = group.get(field);
      if (control.dirty) {
        if (control instanceof FormControlExtended) {
          this.getControlValue(control, command);
        } else if (control instanceof FormGroupExtended) {
          this.getFormGroupChanges(control, command);
        }
      }
    }
  }

  private getFormGroupDeletionChanges(group: FormGroupExtended, command: CommandDto) {
    const control = group.get('Id');
    command.entityId = control.value;
  }

  private getFormControlDeletionChanges(control: FormControlExtended, command: CommandDto) {
    const dragDropContainer = control.value as DragDropContainer;

    if (dragDropContainer) {
      command.entityId = dragDropContainer.value.Id;
    }
  }

  private getEntityType(control: AbstractControl, command: CommandDto) {
    const formGroupExtended = control as FormGroupExtended;

    if (formGroupExtended) {
      if (formGroupExtended.entityType) {
        command.entityName = formGroupExtended.entityType as EntityTypeDto;
      } else {
        this.getEntityType(formGroupExtended.parent, command);
      }
    }
  }

  public getnerateChangedControlString(rootFormGroup: UntypedFormGroup): CommandDto[] {
    const result: CommandDto[] = [];

    const command = new CommandDto();

    command.entityName = EntityTypeDto.Policy;

    result.push(command);

    for (const field in rootFormGroup.controls) {
      const control = rootFormGroup.get(field);

      if (control.dirty) {
        if (control instanceof FormControlExtended) {
          command.properties[field] = new ChangedPropertyValueDto(control.value);
        } else if (control instanceof FormGroupExtended) {
          this.getFormGroupChanges(control, command);
        }
      }
    }

    return result;
  }
}
