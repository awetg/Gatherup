import { Pipe, PipeTransform } from '@angular/core';
import { EventProvider } from '../../providers/event/event';

/**
 * Generated class for the CommentsPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'comments',
})
export class CommentsPipe implements PipeTransform {

  constructor(public eventProvider: EventProvider) {}

  /**
   * Takes a file_id and returns comments.
   */
  async transform(file_id: number, ...args) {
    const comment = await this.eventProvider.fetchComment(file_id).then(res => res.comment).catch(err => console.log(err));
    console.log(comment);
    return comment;
  }
}
