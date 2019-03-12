import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ItemFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'itemFilter',
})
export class ItemFilterPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], filterFunc: (item: any) => boolean) {
    if (!items || !filterFunc) return;
    return items.filter(item => filterFunc(item));
  }
}
