import { Pipe, PipeTransform } from '@angular/core';
import { MediaProvider } from '../../providers/media/media';

@Pipe({
  name: 'comments',
})
export class CommentsPipe implements PipeTransform {

  constructor(public mediaProvider: MediaProvider) {}

  /**
   * Takes a file_id and returns comments.
   */
  async transform(file_id: number, ...args) {
    return new Promise((resolve, reject) => {
      this.mediaProvider.getMediaComment(file_id).subscribe(comments => resolve(comments));
    });
  }
}
