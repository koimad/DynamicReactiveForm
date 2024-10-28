import { Injectable } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { FormArrayExtended } from '../components/my-form/FormArrayExtended';
import { FormControlExtended } from '../components/my-form/FormControlExtended';
import { FormGroupExtended } from '../components/my-form/FormGroupExtended';
import { CommandDto } from './commands/CommandDto';
import { ChangedPropertyValueDto } from './commands/ChangedPropertyValueDto';
import { CommandOperationDto } from './commands/CommandOperationDto';



@Injectable({
  providedIn: 'root',
})
export class FormUpdatedValuesService {
  
  private getFormGroupChanges(group : FormGroupExtended, command: CommandDto, handleInserts: boolean = false) {  
      
    for (const field in group.controls) {
      const control = group.get(field); 
      if(control.dirty || handleInserts){

        if (control instanceof FormControlExtended) {
            command.properties[field] = control.value;            
        }
        else if(control instanceof FormGroupExtended){           
          this.getFormGroupChanges(control,command);
        }
        else if(control instanceof FormArrayExtended)
        {
          let formArray = control as FormArrayExtended;
          let commands : CommandDto[] = [];
          command.associatedCommands[control.Key] = commands;
          let changes = formArray.getChanges();

          changes.added.forEach(rowControl => {
              let itemCommand : CommandDto = new CommandDto();
              commands.push(itemCommand);
              itemCommand.operation = CommandOperationDto.Create;
              
              if(rowControl instanceof FormGroupExtended){
                this.getFormGroupChanges(rowControl, itemCommand,true);
              }
            });

          changes.modified.forEach(rowControl => {
            let itemCommand : CommandDto = new CommandDto();
            commands.push(itemCommand);
            itemCommand.operation = CommandOperationDto.Update;              
            if(rowControl instanceof FormGroupExtended){
              this.getFormArrayGroupChanges(rowControl, itemCommand);
            }
          });
          
          changes.deleted.forEach(rowControl => {
            let itemCommand : CommandDto = new CommandDto();
            commands.push(itemCommand);
            itemCommand.operation = CommandOperationDto.Delete;              
            if(rowControl instanceof FormGroupExtended){                
              this.getFormGroupDeletionChanges(rowControl, itemCommand);
            }
          });
        }
      }
    }
  }
  private getFormArrayGroupChanges(group: FormGroupExtended, command: CommandDto) {
    
    command.entityId = group.controls["id"].value;
    
    for (const field in group.controls) {
      const control = group.get(field); 
      if(control.dirty){

        if (control instanceof FormControlExtended) {
            command.properties[control.Key] = control.value;            
        }
        else if(control instanceof FormGroupExtended){            
          this.getFormGroupChanges(control,command);          
        }
      }
    }
  }

  private getFormGroupDeletionChanges(group: FormGroupExtended, command: CommandDto) {    
    const control = group.get("id"); 
    command.entityId = control.value;
  }


  public getnerateChangedControlString(rootFormGroup: UntypedFormGroup): CommandDto[] {
    let result : CommandDto[] = [];
    let command = new CommandDto();
    result.push(command);
    for (const field in rootFormGroup.controls) { 
      
      const control = rootFormGroup.get(field);          

      if(control.dirty) {
        if (control instanceof FormControlExtended) {     
          command.properties[field] = new ChangedPropertyValueDto(control.value);
        }
        else if(control instanceof FormGroupExtended) {
          this.getFormGroupChanges(control,command);          
        }
      }

    }

    return result;
  }  
}
