import { Pipe, PipeTransform } from '@angular/core';
import { EventProvider } from '../../providers/event/event';
import { Event } from '../../interface/event';

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnail',
})
export class ThumbnailPipe implements PipeTransform {

  constructor(public eventProvider: EventProvider) {}

  /**
   * Takes a value and makes it lowercase.
   */
  async transform(file_id: number, ...args) {
    return new Promise((resolve, reject) => {
      this.eventProvider.fetchThumbnail(file_id).subscribe(
        (event: Event) => {
          switch (args[0]) {
            case 'large': {
              resolve(event.thumbnails['w640']);
              break;
            }

            case 'medium': {
              resolve(event.thumbnails['w320']);
              break;
            }

            case 'small': {
              resolve(event.thumbnails['w160']);
              break;
            }

            default: {
              resolve(event.thumbnails['w160']);
              break;
            }
          }
        }
      );
    });
  }
}
