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
  async transform(user_id: number) {
    return new Promise((resolve, reject) => {
      this.authProvider.getuserInfo(user_id).subscribe(res => {
        console.log(res);
        resolve(res);
      });
    });
  }
}
