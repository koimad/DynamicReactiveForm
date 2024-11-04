import { ValueOneOfCaseDto } from './ValueOneOfCaseDto';

export class ChangedPropertyValueDto {
  public integer?: number | undefined;

  public long?: number | undefined;

  public boolean?: boolean | undefined;

  public text?: string | undefined;

  public single?: number | undefined;

  public double?: number | undefined;

  public valueCase?: ValueOneOfCaseDto;

  public constructor(value: object) {
    if (typeof value === 'number') {
      if (Number.isInteger(value)) {
        this.long = value;
        this.valueCase = ValueOneOfCaseDto.Long;
      } else {
        this.double = value;
        this.valueCase = ValueOneOfCaseDto.Double;
      }
    } else if (typeof value === 'string') {
      this.text = value;
      this.valueCase = ValueOneOfCaseDto.Text;
    } else if (typeof value === 'boolean') {
      this.boolean = value;
      this.valueCase = ValueOneOfCaseDto.Boolean;
    }
  }
}
