import { Pipe, PipeTransform } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';

@Pipe({
  name: 'userInfo',
})
export class UserInfoPipe implements PipeTransform {

  constructor(public authProvider: AuthProvider) {}

  /**
   * Takes user_id and gives the user Info like fullname , email and username
   */
  async transform(user_id: number) {
    return new Promise((resolve, reject) => {
      this.authProvider.getuserInfo(user_id).subscribe(res => {
        resolve(res);
      });
    });
  }
}
