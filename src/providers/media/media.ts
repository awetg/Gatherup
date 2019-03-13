import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppDBMedia, Comment, Favourite, Media, MediaUploadResponse } from '../../interface/media';
import { AppConstantProvider } from '../app-constant/app-constant';
import { UserDBMedia } from '../../interface/user';
import { Event } from '../../interface/event';
import { Observable } from 'rxjs';

/*
* Media provider for the App, all calls to media routes are done throught this provider
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

  async updateAppDB(file_id: number, data: any): Promise<{ message: string }> {
    /* App database media is owned by a specific user and since logged in user can't update it, 
    * this token is needed to update the media file
    */
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1NjgsInVzZXJuYW1lIjoiYmIiLCJlbWFpbCI6ImNoYW5nZWRBZ2FpbkBnbWFpbC5jb20iLCJmdWxsX25hbWUiOm51bGwsImlzX2FkbWluIjpudWxsLCJ0aW1lX2NyZWF0ZWQiOiIyMDE5LTAxLTI4VDE2OjExOjAwLjAwMFoiLCJpYXQiOjE1NTI0MDQ4OTMsImV4cCI6MTU1NDQ3ODQ5M30.t4Wv3_E8Azh-Q0g0lZrnD7jtJg5eym-kXeJ_rsS-4s8';
    const httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': token }),
    };
    return this.http.put<{ message: string }>(this.appConstant.API.API_ENDPOINT + '/media/' + file_id, data, httpOptions).toPromise();
  }

  createFavourite(file_id: number) {
    const httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': localStorage.getItem('token') }),
    };
    const params = { file_id };
    return this.http.post<{ message: string, favourite_id: number }>(this.appConstant.API.API_ENDPOINT + '/favourites', params, httpOptions);
  }


  deleteFavourite(file_id: number) {
    const httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': localStorage.getItem('token') }),
    };
    return this.http.delete<{ message: string, favourite_id: number }>(this.appConstant.API.API_ENDPOINT + '/favourites/file/' + file_id, httpOptions);
  }

  getFavouriteById(file_id: number) {
    return this.http.get<Favourite[]>(this.appConstant.API.API_ENDPOINT + '/favourites/file/' + file_id);
  }

  getAllFavourite() {
    const httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': localStorage.getItem('token') }),
    };
    return this.http.get<Favourite[]>(this.appConstant.API.API_ENDPOINT + '/favourites', httpOptions);
  }

}
