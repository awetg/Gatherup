import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excerpt',
})
export class ExcerptPipe implements PipeTransform {
  /**
   * Takes a string and returns desired number of characters
   */
  transform(text: string, length: number) {
    if (text.length > length) {
      return text.substring(0, length) + ' ...';
    }
    return text;
  }
}
