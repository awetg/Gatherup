import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'itemFilter',
})
export class ItemFilterPipe implements PipeTransform {
  /**
   * Takes a any list and function to filter them and returns the filtered list, very hand and generic pipe filter.
   */
  transform(items: any[], filterFunc: (item: any) => boolean) {
    if (!items || !filterFunc) return;
    return items.filter(item => filterFunc(item));
  }
}
