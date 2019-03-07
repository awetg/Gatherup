import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LogInForm, LoginResponse, User } from '../../interface/user';
import { AppConstantProvider } from '../app-constant/app-constant';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  private _authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly authenticated: Observable<boolean> = this._authenticated.asObservable();

  private _user: BehaviorSubject<User> = new BehaviorSubject<User>({});
  readonly user: Observable<User> = this._user.asObservable();

  constructor(public http: HttpClient, public appConstant: AppConstantProvider) {
    console.log('Hello AuthProvider Provider');
  }



  // signup(data: any) {

  // }

  async logIn(user: LogInForm): Promise<any> {
    this.http.post<LoginResponse>(this.appConstant.API.API_ENDPOINT + '/login', user).subscribe(
      response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this._authenticated.next(true);
        this._user.next(response.user);
        return response.user;
      },
      error => { throw new Error(error); }
    );
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    this._authenticated.next(false);
  }

  isAuthecticated(): Observable<boolean> {
    if (!this._authenticated.getValue()) {
      const token = localStorage.getItem('token');
      if (token !== undefined) {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user !== null) {
          const httpOptions = {
            headers: new HttpHeaders({
              'x-access-token': token,
            },
            ),
          };
          this.http.get<User>(this.appConstant.API.API_ENDPOINT + '/users/' + user.user_id, httpOptions).subscribe(
            userResponse => {
              this._user.next(userResponse);
              this._authenticated.next(true);
            },
            error => console.log(error)
          );
        }
      }
    }
    return this.authenticated;
  }

  canEnterPage(): boolean {
    return this._authenticated.getValue();
  }
}
