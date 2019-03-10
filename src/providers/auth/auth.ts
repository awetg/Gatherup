import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CheckUserResponse,
  LogInForm,
  LoginResponse, RegisterResponse,
  SignUpForm,
  User,
  UserInfoDescription,
} from '../../interface/user';
import { AppConstantProvider } from '../app-constant/app-constant';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MediaUploadResponse } from '../../interface/media';
import { MediaProvider } from '../media/media';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  loggedIn = false;
  private _authenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly authenticated: Observable<boolean> = this._authenticated.asObservable();

  private _user: BehaviorSubject<User> = new BehaviorSubject<User>({});
  readonly user: Observable<User> = this._user.asObservable();

  constructor(
    public http: HttpClient,
    public appConstant: AppConstantProvider,
    public mediaProvider: MediaProvider) {
    console.log('Hello AuthProvider Provider');
  }

  async logIn(user: LogInForm): Promise<any> {
    try {
      const loginResponse = await this.http.post<LoginResponse>(this.appConstant.API.API_ENDPOINT + '/login', user).toPromise();
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('user', JSON.stringify(loginResponse.user));
      this._authenticated.next(true);
      this._user.next(loginResponse.user);
      return loginResponse.user;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    localStorage.clear();
    this._authenticated.next(false);
  }

  checkUsername(username) {
    return this.http.get<CheckUserResponse>(this.appConstant.API.API_ENDPOINT + '/users/username/' + username);
  }

  async register(userData: SignUpForm): Promise<any> {
    userData.confirmPassword = undefined;
    try {
      /* first update a media file to store more user info on description of that file */
      const userDescription: UserInfoDescription = {};
      userDescription.full_name = userData.full_name;
      userDescription.email = userData.email;
      userDescription.interest = userData.intereset;
      const mediaUploadResponse = await this.uploadUserInfoMedia(userDescription);

      /* attach file_id of uploaded media to fullname with string separator and register user*/
      userData.full_name = userData.full_name + '##' + mediaUploadResponse.file_id;
      await this.http.post<RegisterResponse>(this.appConstant.API.API_ENDPOINT + '/users', userData).toPromise();

      /* finally login user instead of redirecting to login page */
      const userCreds: LogInForm = { username: userData.username, password: userData.password };
      const user: User = await this.logIn(userCreds).catch(error => console.log(error));
    } catch (error) {
      console.log(error);
      throw error;
    }
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
    const uploadResponse = await this.mediaProvider.uploadMedia(data);
    return this.mediaProvider.tagMedia(uploadResponse.file_id, this.appConstant.APP.AVATAR_TAG);
  }

  getUser(): User {
    return this._user.getValue();
  }

  /* returns base64 of a file from url */
  async getDataUrl(url): Promise<string | ArrayBuffer> {
    return new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
        const reader = new FileReader();
        reader.onload = () => res(reader.result);
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    });
  }

  /* uploads a new media file for user info storage */
  async uploadUserInfoMedia(userDescription: UserInfoDescription): Promise<MediaUploadResponse> {
    try {
      /* Download a small media file to reupload for new registering user */
      const myBase64 = await this.getDataUrl(this.appConstant.API.MEDIA_ENDPOINT + '/437e54b7c7750dcbc20f58ab31c38307.png');

      /* convert base64 to blop to upload with formdata */
      const byteString = atob(myBase64.toString().split(',')[1]);
      const arrbuff = new Uint8Array(byteString.length);
      for (let i = 0; i < byteString.length; i++) {
        arrbuff[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([arrbuff], { type: 'image/png' });

      /* upload the file again and return response, file_id will be associated with new registering user and new file will store user info */
      const fd = new FormData();
      fd.append('title', this.appConstant.APP.USER_INFO_TITLE);
      fd.append('file', blob);
      fd.append('description', JSON.stringify(userDescription));
      return this.mediaProvider.uploadMedia(fd);
    } catch (error) {
      console.log(error);
    }
  }
}
