import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppDBDescription } from '../../interface/media';
import { Observable } from 'rxjs';
import { AppConstantProvider } from '../app-constant/app-constant';
import { MediaProvider } from '../media/media';

/*
  Generated class for the AppDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppDbProvider {

  private _appDB: BehaviorSubject<AppDBDescription> = new BehaviorSubject<AppDBDescription> ({});
  readonly appDB: Observable<AppDBDescription> = this._appDB.asObservable();

  constructor(
    public http: HttpClient,
    public mediaProvider: MediaProvider,
    public appConstant: AppConstantProvider) {
    console.log('Hello AppDbProvider Provider');
    this.loadAppDB();
  }

  loadAppDB() {
    console.log('loading app DB');
    this.mediaProvider.getAppDBMedia(this.appConstant.APP.APP_INFO_MEDIA_ID).subscribe(
      appMedia => {
        const desc: AppDBDescription = JSON.parse(appMedia.description as string);
        this._appDB.next(desc);
      }
    );
  }

  addUser(user_id: number, file_id: number) {
    const db = this._appDB.getValue();
    db.users.push({ user_id, file_id });
    const data = { 'description': JSON.stringify(db) };
    this.mediaProvider.updateMedia(this.appConstant.APP.APP_INFO_MEDIA_ID, data).catch(error => console.log(error));
  }

  getUserFileId(user_id: number): number {
    const user = this._appDB.getValue().users.filter(u => u.user_id === user_id);
    return user.length > 0 ? user[0].file_id : -1 ;
  }

}
