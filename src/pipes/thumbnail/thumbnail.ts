import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';
import { Media } from '../../interface/media';

/**
 * Generated class for the ThumbnailPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'thumbnail',
})
export class ThumbnailPipe implements PipeTransform {

  constructor(public mediaProvider: MediaProvider) {}

  /**
   * Takes a value and makes it lowercase.
   */
  async transform(file_id: number, ...args) {
    return new Promise((resolve, reject) => {
      if (file_id === undefined) resolve(undefined);
      this.mediaProvider.fetchThumbnail(file_id).subscribe(
        (media: Media) => {
          switch (args[0]) {
            case 'large': {
              resolve(media.thumbnails['w640']);
              break;
            }

            case 'medium': {
              resolve(media.thumbnails['w320']);
              break;
            }

            case 'small': {
              resolve(media.thumbnails['w160']);
              break;
            }

            case 'original': {
              resolve(media.filename);
              break;
            }

            default: {
              resolve(media.thumbnails['w160']);
              break;
            }
          }
        }
      );
    });
  }
}
