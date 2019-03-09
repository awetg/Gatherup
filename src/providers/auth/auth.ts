import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CheckUserResponse,
  LogInForm,
  LoginResponse, RegisterResponse,
  SignUpForm,
  User,
} from '../../interface/user';
import { AppConstantProvider } from '../app-constant/app-constant';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { EventUploadResponse } from '../../interface/event';
import { EventProvider } from '../event/event';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  mediaAPI = 'http://media.mw.metropolia.fi/wbma/';
  loggedIn = false;
  private _authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly authenticated: Observable<boolean> = this._authenticated.asObservable();

  private _user: BehaviorSubject<User> = new BehaviorSubject<User>({});
  readonly user: Observable<User> = this._user.asObservable();

  constructor(public http: HttpClient, public appConstant: AppConstantProvider, public eventProvider: EventProvider) {
    console.log('Hello AuthProvider Provider');
  }

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
    localStorage.clear();
    this._authenticated.next(false);
  }

  checkUser(username) {
    return this.http.get<CheckUserResponse>(this.appConstant.API.API_ENDPOINT + '/users/username/' + username);
  }

  register(userData: SignUpForm) {
    userData.confirmPassword = undefined;

    return this.http.post<RegisterResponse>(this.appConstant.API.API_ENDPOINT + '/users', userData).subscribe(
      response => {
        const user: LogInForm = { username: userData.username, password: userData.password };
        this.logIn(user).catch(error => console.log(error));
      }
    );
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

  async updateUserInfo(data: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': localStorage.getItem('token') })
    };
    return this.http.put(this.appConstant.API.API_ENDPOINT + '/users', data, httpOptions).toPromise();
  }

  async updateAvatar(data: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': localStorage.getItem('token'), })
    };
    const uploadResponse = await this.http.post<EventUploadResponse>(this.appConstant.API.API_ENDPOINT + '/media', data, httpOptions).toPromise();
    return this.eventProvider.tagMedia(uploadResponse.file_id, this.appConstant.APP.AVATAR_TAG);
  }

  getUser(): User {
    return this._user.getValue();
  }
}
