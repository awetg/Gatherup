import { Pipe, PipeTransform } from '@angular/core';
import { Event } from '../../interface/event';
import { MediaProvider } from '../../providers/media/media';

@Pipe({
  name: 'favoriteFilter',
})
export class FavoriteFilterPipe implements PipeTransform {

  constructor(public mediaProvider: MediaProvider){}
  /**
   * Takes list of events and filter those currently logged in user marked as interested
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
