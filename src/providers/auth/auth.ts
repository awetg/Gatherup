import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CheckUserResponse,
  LogInForm,
  LoginResponse, RegisterResponse,
  SignUpForm,
  User,
  UserDBDescription,
  UserDBMedia,
  UserInfo,
} from '../../interface/user';
import { AppConstantProvider } from '../app-constant/app-constant';
import { MediaProvider } from '../media/media';
import { AppDbProvider } from '../app-db/app-db';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MediaUploadResponse } from '../../interface/media';
import { EventProvider } from '../event/event';

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

  private _userDB: BehaviorSubject<UserDBMedia> = new BehaviorSubject<UserDBMedia>({});
  readonly userDB: Observable<UserDBMedia> = this._userDB.asObservable();

  constructor(
    public http: HttpClient,
    public appConstant: AppConstantProvider,
    public mediaProvider: MediaProvider,
    public appDB: AppDbProvider,
    public eventProvider: EventProvider) {
    console.log('Hello AuthProvider Provider');
  }

  async logIn(user: LogInForm): Promise<any> {
    try {
      /* Login user with credentials and store response in local storage */
      const loginResponse = await this.http.post<LoginResponse>(this.appConstant.API.API_ENDPOINT + '/login', user).toPromise();
      localStorage.setItem('token', loginResponse.token);
      localStorage.setItem('user', JSON.stringify(loginResponse.user));
      this._authenticated.next(true);
      this._user.next(loginResponse.user);

      /* try to fetch user DB media if it exists or create new DB media if user is not registered user of the App */
      const file_id = this.appDB.getUserFileId(loginResponse.user.user_id);
      if (file_id > 0) {

        const db = await this.getUserDBMedia(file_id);
        this._userDB.next(db);

      } else {
        // get full user info from API to add fullname to user DB Media
        const httpOptions = {
          headers: new HttpHeaders({ 'x-access-token': loginResponse.token })
        };
        const userInfo = await this.http.get<UserInfo>(this.appConstant.API.API_ENDPOINT + '/users/' + loginResponse.user.user_id, httpOptions).toPromise();

        // add fullname to DB of user since it the only info known about user so far
        const userDescription: UserDBDescription = { full_name: userInfo.full_name };

        // create DBmedia for user
        const mediaUploadRes = await this.uploadUserInfoMedia(userDescription);

        // add user to App database
        this.appDB.addUser(loginResponse.user.user_id, mediaUploadRes.file_id);

        // get new uploaded user DB media
        const db = await this.getUserDBMedia(mediaUploadRes.file_id);
        this._userDB.next(db);
      }

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

  /* check if username is available */
  checkUsername(username) {
    return this.http.get<CheckUserResponse>(this.appConstant.API.API_ENDPOINT + '/users/username/' + username);
  }

  async register(userData: SignUpForm): Promise<any> {
    const tmpData = { username: userData.username, password: userData.password, email: userData.email, full_name: userData.full_name };
    try {
      console.log(userData);

      /* register user get user_id */
      const registerRes = await this.http.post<RegisterResponse>(this.appConstant.API.API_ENDPOINT + '/users', tmpData).toPromise();

      /* login user instead of redirecting to login page */
      const userCreds: LogInForm = { username: userData.username, password: userData.password };
      const loginRes = await this.logIn(userCreds);

      /* update media database that was created by login function, login function created media db for users of api not signed up with this app*/
      const userDescription: UserDBDescription = { full_name: userData.full_name, interest: userData.intereset };
      const mediaUploadRes = await this.updateUserDBMedia(userDescription);

      return registerRes;

    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /* returns an observalble boolea of if user is logged in */
  isAuthecticated(): Observable<boolean> {

    /* if user is logged in, make API call to verify token */
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
              this.refreshUserDBMedia().catch(error => console.log(error));
            },
            error => console.log(error)
          );
        }
      }
    }
    return this.authenticated;
  }

  /* used with ionViewCanEnter as route guard for authentication protected routes/pages */
  canEnterPage(): boolean {
    return this._authenticated.getValue();
  }

  /* Modify user data. username, password and email fields can only be updated */
  async updateUserInfo(data: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': localStorage.getItem('token') })
    };
    return this.http.put(this.appConstant.API.API_ENDPOINT + '/users', data, httpOptions).toPromise();
  }

  /* update user DB media of current user (logged in user ) */
  async updateUserDBMedia(data: UserDBDescription): Promise<any> {
    const currentDB = this._userDB.getValue().description;

    /* get all none null entry and update current user database accordingly */
    Object.entries(data).forEach((entry) => {
      const [key, value] = [entry[0], entry[1]];
      // check the value is not undefined , null or if it is string or array length must be > 0
      if (value !== undefined && value !== null && value.length > 0) {
        // if it is array push each new value if is does not exist except when the array is user interests ( list of category )
        if (Array.isArray(value)) {

          // if array is interest assing new array instead of adding new values
          if (key === 'interest') {

            currentDB[key] = value;

          } else {

            value.forEach(v => {
              if (currentDB[key].indexOf(v) === -1) currentDB[key].push(v);
            });
          }

        } else {
          // when the values is not array assign the new value
          currentDB[key] = value;
        }
      }
    });
    const payload = { 'description': JSON.stringify(currentDB) };
    await this.mediaProvider.updateMedia(this._userDB.getValue().file_id, payload).catch(error => console.log(error));
    const db = await this.getUserDBMedia(this._userDB.getValue().file_id);
    this._userDB.next(db);
  }

  async updateAvatar(data: any): Promise<any> {
    try {

      /* upload the new avatar */
      const uploadResponse = await this.mediaProvider.uploadMedia(data);
      this.mediaProvider.tagMedia(uploadResponse.file_id, this.appConstant.APP.AVATAR_TAG).catch(error => console.log(error));

      /* get the current user Db media and update the avatar file id */
      const userDB = this._userDB.getValue();
      userDB.description.avatar_id = uploadResponse.file_id;

      /* update the user DB media with the new data */
      const payload = { 'description': JSON.stringify(userDB.description) };
      this.mediaProvider.updateMedia(userDB.file_id, payload).catch(error => console.log(error));
      const db = await this.mediaProvider.getUserDBMedia(userDB.file_id);
      console.log(db);
      this._userDB.next(db);
      return uploadResponse;

    } catch (error) {
      console.log(error);
    }
  }

  /* uploads a new media file for user info storage */
  async uploadUserInfoMedia(userDescription: UserDBDescription): Promise<MediaUploadResponse> {
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

  /* returns base64 of a file from url */
  async getDataUrl(url: string) {
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

  async getUserDBMedia(file_id: number): Promise<UserDBMedia> {
    try {
      const userDB = await this.mediaProvider.getUserDBMedia(file_id);
      const desc: UserDBDescription = JSON.parse(userDB.description as string);
      userDB.description = desc;
      return userDB;
    } catch (error) {
      console.log(error);
    }
  }

  async refreshUserDBMedia() {
    const file_id = this.appDB.getUserFileId(this._user.getValue().user_id);
    const db = await this.getUserDBMedia(file_id);
    this._userDB.next(db);
  }

  getuserInfo(user_id: number) {
    const httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': localStorage.getItem('token') })
    };
    return this.http.get<UserInfo>(this.appConstant.API.API_ENDPOINT + '/users/' + user_id, httpOptions);
  }

  async joinEvent(file_id: number) {
    try {
      const currentDB = this._userDB.getValue();
      currentDB.description.joinedEvents ? currentDB.description.joinedEvents.push(file_id) : currentDB.description.joinedEvents = [file_id];
      const payload = { 'description': JSON.stringify(currentDB) };
      const message = await this.mediaProvider.updateMedia(currentDB.file_id, payload).catch(error => console.log(error));
      this.eventProvider.loadEvents();
      return message;

    } catch (error) {
      console.log(error);
    }
  }

  async deleteJoinEvent(file_id: number) {
    try {
      const currentDB = this._userDB.getValue();
      const index = currentDB.description.joinedEvents !== undefined ? currentDB.description.joinedEvents.indexOf(file_id) : -1;
      if (file_id >= 0) {
        currentDB.description.joinedEvents.splice(index, 1);
        const payload = { 'description': JSON.stringify(currentDB) };
        const message = await this.mediaProvider.updateMedia(currentDB.file_id, payload).catch(error => console.log(error));
        this.eventProvider.loadEvents();
        return message;
      }

    } catch (error) {
      console.log(error);
    }
  }

}
