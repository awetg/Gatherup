import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppDBMedia, Comment, Media, MediaUploadResponse } from '../../interface/media';
import { AppConstantProvider } from '../app-constant/app-constant';
import { UserDBMedia } from '../../interface/user';
import { Event } from '../../interface/event';
import { Observable } from 'rxjs';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  constructor(
    public http: HttpClient,
    public appConstant: AppConstantProvider) {
    console.log('Hello MediaProvider Provider');
  }

  async uploadMedia(data: any): Promise<MediaUploadResponse> {
    const httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': localStorage.getItem('token') }),
    };
    return this.http.post<MediaUploadResponse>(this.appConstant.API.API_ENDPOINT + '/media', data, httpOptions).toPromise();
  }

  async tagMedia(file_id: number, tag: string): Promise<any> {
    const httpParams = { file_id, tag };
    const httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': localStorage.getItem('token') }),
    };
    return this.http.post(this.appConstant.API.API_ENDPOINT + '/tags', httpParams, httpOptions).toPromise();
  }

  async updateMedia(file_id: number, data: any): Promise<{ message: string }> {
    const httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': localStorage.getItem('token') }),
    };
    return this.http.put<{ message: string }>(this.appConstant.API.API_ENDPOINT + '/media/' + file_id, data, httpOptions).toPromise();
  }

  getEventMedias(): Observable<Event[]> {
    return this.http.get<Event[]>(this.appConstant.API.API_ENDPOINT + '/tags/' + this.appConstant.APP.EVENT_TAG);
  }

  /* get a single media file but as type of UserDBMedia for easy easy parse of file description and using it with Typescript*/
  async getUserDBMedia(file_id: number): Promise<UserDBMedia> {
    return this.http.get<UserDBMedia>(this.appConstant.API.API_ENDPOINT + '/media/' + file_id).toPromise();
  }

  /* get a single media file but as type of Event for easy easy parse of file description and using it with Typescript */
  getEventMedia(file_id: number) {
    return this.http.get<Event>(this.appConstant.API.API_ENDPOINT + '/media/' + file_id);
  }

  /* get a single media file but as type of APPMedia for easy easy parse of file description and using it with Typescript */
  getAppDBMedia(file_id: number) {
    return this.http.get<AppDBMedia>(this.appConstant.API.API_ENDPOINT + '/media/' + file_id);
  }

  fetchThumbnail(file_id: number) {
    return this.http.get<Media>(this.appConstant.API.API_ENDPOINT + '/media/' + file_id);
  }

  getMediaComment(file_id: number) {
    return this.http.get<Comment[]>(this.appConstant.API.API_ENDPOINT + '/comments/file/' + file_id);
  }

  addMediaComment(file_id: number, comment: string) {
    const httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': localStorage.getItem('token') }),
    };
    const params = { file_id, comment };
    return this.http.post<{ message: string, comment_id: number }>(this.appConstant.API.API_ENDPOINT + '/comments', params, httpOptions);
  }

}
