import { Pipe, PipeTransform } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';


/**
 * Generated class for the UserInfoPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'userInfo',
})
export class UserInfoPipe implements PipeTransform {

  constructor(public authProvider: AuthProvider) {}

  /**
   * Takes user_id and gives the user Info
   */
  async transform(user_id: number, ...args) {
    const username = await this.authProvider.userInfo(user_id).then(res => res.username).catch(err => console.log(err));
    console.log(username);
    return username;
  }
}
