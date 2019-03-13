import { Pipe, PipeTransform } from '@angular/core';
import { AppDbProvider } from '../../providers/app-db/app-db';
import { AuthProvider } from '../../providers/auth/auth';

@Pipe({
  name: 'userDb',
})
export class UserDbPipe implements PipeTransform {

  constructor(public appDB: AppDbProvider, public authProvider: AuthProvider) {}

  /**
   * Takes a user id and return the file description of the media marked as database for the user
   */
  async transform(user_id: number) {
    const userFileId = this.appDB.getUserFileId(user_id);
    this.authProvider.getUserDBMedia(userFileId)
      .then(uDB => uDB.description)
      .catch(error => console.log(error));
  }
}
