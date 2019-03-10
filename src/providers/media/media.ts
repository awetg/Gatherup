import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MediaUploadResponse } from '../../interface/media';
import { AppConstantProvider } from '../app-constant/app-constant';

/*
  Generated class for the MediaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MediaProvider {

  constructor(public http: HttpClient, public appConstant: AppConstantProvider) {
    console.log('Hello MediaProvider Provider');
  }

  async uploadMedia(data: any): Promise<MediaUploadResponse> {
    const httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': localStorage.getItem('token') }),
    };
    return this.http.post<MediaUploadResponse>(this.appConstant.API.API_ENDPOINT + '/media', data, httpOptions).toPromise()
  }

  async tagMedia(file_id: number, tag: string): Promise<any> {
    const httpParams = { file_id, tag };
    const httpOptions = {
      headers: new HttpHeaders({ 'x-access-token': localStorage.getItem('token') }),
    };
    return this.http.post(this.appConstant.API.API_ENDPOINT + '/tags', httpParams, httpOptions).toPromise();
  }

  async getSingleMedia(file_id: number): Promise<any> {
    return this.http.get<Event>(this.appConstant.API.API_ENDPOINT + '/media/' + file_id).toPromise();
  }

}
