import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogInForm, LoginResponse } from '../../interface/user';
import { AppConstantProvider } from '../app-constant/app-constant';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private _loggedIn = false;

  constructor(public http: HttpClient, public appConstant: AppConstantProvider) {
    console.log('Hello AuthProvider Provider');
  }



  signup(data: any) {

  }

  async logIn(user: LogInForm): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json',
      },
      ),
    };
    this.http.post<LoginResponse>(this.appConstant.API.API_ENDPOINT + '/login', user, httpOptions).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userData', JSON.stringify(response.user));
        this._loggedIn = true;
        return response.user;
      },
      error => { throw new Error(error); }
    );
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this._loggedIn = false;
  }

  isLoggedIn(): boolean {
    return this._loggedIn || (localStorage.getItem('token') !== null && localStorage.getItem('token').length > 0);
  }
}
