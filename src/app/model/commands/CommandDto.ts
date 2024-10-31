import { Guid } from '../utilities/guid';
import { ChangedPropertyValueDto } from './ChangedPropertyValueDto';
import { CommandOperationDto } from './CommandOperationDto';
import { EntityTypeDto } from './EntityTypeDto';
import { ValidationErrorDto } from './ValidationErrorDto';

export class CommandDto {
  correlationId: Guid = Guid.create();
  entityId: 0;
  operation: CommandOperationDto = CommandOperationDto.None;
  entityName: EntityTypeDto = EntityTypeDto.None;
  properties: Record<string, ChangedPropertyValueDto> = {};
  rowVersion: '';
  associatedCommands?: Record<string, CommandDto[]> = {};
  validationErrors?: ValidationErrorDto[] | undefined;
}
