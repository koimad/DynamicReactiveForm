import { numberAttribute } from "@angular/core";
import { ValueOneOfCaseDto } from "./ValueOneOfCaseDto";


export class ChangedPropertyValueDto {
    integer?: number | undefined;
    long?: number | undefined;
    boolean?: boolean | undefined;
    text?: string | undefined;
    single?: number | undefined;
    double?: number | undefined;
    valueCase?: ValueOneOfCaseDto;

    constructor (value: object) {
        if( typeof value === 'number' ){
            if(Number.isInteger(value)){
                this.long = value;
                this.valueCase = ValueOneOfCaseDto.Long;
            }
            else{
                this.double = value;
                this.valueCase = ValueOneOfCaseDto.Double;
            }            
        }
        else if (typeof value === 'string'){
            this.text = value;
            this.valueCase = ValueOneOfCaseDto.Text;
        }   
        else if (typeof value === 'boolean'){
            this.boolean = value;
            this.valueCase = ValueOneOfCaseDto.Boolean;
        }   
        
    }
}
