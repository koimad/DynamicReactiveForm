import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jsonprettyprint'
})
export class JsonPrettyPrintPipe implements PipeTransform {
  transform(val) {
    if (val == undefined || val == null) {
      return '';
    }
    // eslint-disable-next-line no-control-regex
    const text = JSON.stringify(val, undefined, 2).replace(new RegExp(' ', 'g'), '&nbsp;').replace(new RegExp('\n', 'g'), '<br/>');

    return text;
  }
}
