import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'jsonprettyprint' })
export class JsonPrettyPrintPipe implements PipeTransform {
  public transform(value) {
    if (value == undefined || value == null) {
      return '';
    }

    const text = JSON.stringify(value, undefined, 2)
      .replace(new RegExp(' ', 'g'), '&nbsp;')
      // eslint-disable-next-line no-control-regex
      .replace(new RegExp('\n', 'g'), '<br/>');

    return text;
  }
}
