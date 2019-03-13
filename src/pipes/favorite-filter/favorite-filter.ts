import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../../interface/event';
import { MediaProvider } from '../../providers/media/media';

/**
 * Generated class for the FavoriteFilterPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'favoriteFilter',
})
export class FavoriteFilterPipe implements PipeTransform {

  constructor(public mediaProvider: MediaProvider){}
  /**
   * Takes a value and makes it lowercase.
   */
  transform(events: Event[]) {
    return new Promise((resolve, reject) => {
      this.mediaProvider.getAllFavourite().subscribe(favourites => {
        const filtered = events.filter(e => favourites.some(f => f.file_id === e.file_id));
        resolve(filtered);
      });
    });
  }
}
