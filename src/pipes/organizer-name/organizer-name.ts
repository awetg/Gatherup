import { Pipe, PipeTransform } from '@angular/core';
import { EventProvider } from '../../providers/event/event';

/**
 * Generated class for the OrganizerNamePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'organizerName',
})
export class OrganizerNamePipe implements PipeTransform {

  constructor(public eventProvider: EventProvider) {}

  /**
   * Takes a user_id and gives the name.
   */
  async transform(user_id: number, ...args) {
    const username = await this.eventProvider.fetchOrganizer(user_id).then(res => res.username).catch(err => console.log(err));
    console.log(username);
    return username;
  }
}
