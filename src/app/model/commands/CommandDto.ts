import { ChangedPropertyValueDto } from "./ChangedPropertyValueDto";
import { CommandOperationDto } from "./CommandOperationDto";
import { EntityTypeDto } from "./EntityTypeDto";
import { ValidationErrorDto } from "./ValidationErrorDto";


export class CommandDto {
  correlationId?: string;
  entityId?: number;
  operation?: CommandOperationDto;
  entityName!: EntityTypeDto;
  properties: { [key: string]: ChangedPropertyValueDto} ;
  rowVersion?: string | undefined;
  associatedCommands?: { [key: string]: CommandDto[]; } | undefined;
  validationErrors?: ValidationErrorDto[] | undefined;

  constructor () {        
    this.properties = {};
    this.associatedCommands = {};
  }
   
}
