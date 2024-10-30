import { Guid } from "../utilities/guid";
import { ChangedPropertyValueDto } from "./ChangedPropertyValueDto";
import { CommandOperationDto } from "./CommandOperationDto";
import { EntityTypeDto } from "./EntityTypeDto";
import { ValidationErrorDto } from "./ValidationErrorDto";


export class CommandDto {
  correlationId: Guid = Guid.create();
  entityId: number = 0;
  operation: CommandOperationDto = CommandOperationDto.None;
  entityName: EntityTypeDto = EntityTypeDto.None;
  properties: { [key: string]: ChangedPropertyValueDto} = {};
  rowVersion: string = "";
  associatedCommands?: { [key: string]: CommandDto[]; } = {};
  validationErrors?: ValidationErrorDto[] | undefined;
     
}
