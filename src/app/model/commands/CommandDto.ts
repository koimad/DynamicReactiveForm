import { Guid } from '../utilities/guid';
import { ChangedPropertyValueDto } from './ChangedPropertyValueDto';
import { CommandOperationDto } from './CommandOperationDto';
import { EntityTypeDto } from './EntityTypeDto';
import { ValidationErrorDto } from './ValidationErrorDto';

export class CommandDto {
  public correlationId: Guid = Guid.create();

  public entityId: 0;

  public operation: CommandOperationDto = CommandOperationDto.None;

  public entityName: EntityTypeDto = EntityTypeDto.None;

  public properties: Record<string, ChangedPropertyValueDto> = {};

  public rowVersion: '';

  public associatedCommands?: Record<string, CommandDto[]> = {};

  public validationErrors?: ValidationErrorDto[] | undefined;
}
