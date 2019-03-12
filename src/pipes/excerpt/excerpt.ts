import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ExcerptPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'excerpt',
})
export class ExcerptPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(text: string, length: number) {
    if (text.length > length) {
      return text.substring(0, length) + ' ...';
    }
    return text;
  }
}
