import { Pipe, PipeTransform } from '@angular/core';
import { AppDbProvider } from '../../providers/app-db/app-db';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the UserDbPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'userDb',
})
export class UserDbPipe implements PipeTransform {

  constructor(public appDB: AppDbProvider, public authProvider: AuthProvider) {}

  /**
   * Takes a value and makes it lowercase.
   */
  async transform(user_id: number) {
    const userFileId = this.appDB.getUserFileId(user_id);
    this.authProvider.getUserDBMedia(userFileId)
      .then(uDB => uDB.description)
      .catch(error => console.log(error));
  }
}
