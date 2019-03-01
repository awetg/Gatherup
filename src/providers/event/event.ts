import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstantProvider } from '../app-constant/app-constant';
import { Event, EventUploadResponse } from '../../interface/event';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {

  private _events: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
  readonly events$: Observable<Event[]> = this._events.asObservable();

  constructor(public http: HttpClient, public appConstant: AppConstantProvider) {
    console.log('Hello EventProvider Provider');
    this.loadEvents();
  }

  loadEvents() {
    console.log('Loading Events');
    this.http.get<Event[]>(this.appConstant.API.API_ENDPOINT + '/tags/EVENT').subscribe(
      (events) => {
        this._events.next(events);
      }
    );
  }

  async addEvent(data: any): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('token'),
      },
      ),
    };
    this.http.post<EventUploadResponse>(this.appConstant.API.API_ENDPOINT + '/media', data, httpOptions).subscribe(
      response => {
        const httpParams = {
          file_id: response.file_id,
          tag: 'EVENT'
        };
        this.http.post(this.appConstant.API.API_ENDPOINT + '/tags', httpParams, httpOptions).subscribe(
          tagResponse => {
            this.loadSingleEvent(response.file_id);
            return tagResponse;
          },
          error => {throw new Error(error); }
        );
      },
      error => { throw new Error(error); }
    );
  }

  loadSingleEvent(file_id: number) {
    this.http.get<Event>(this.appConstant.API.API_ENDPOINT + '/media/' + file_id).subscribe(
      (event) => {
        this._events.next(this._events.getValue().push.apply(this._events.getValue(), event));
        return event;
      },
      error => console.log(error)
    );
  }

  fetchThumbnail(file_id: number) {
    return this.http.get<Event>(this.appConstant.API.API_ENDPOINT + '/media/' + file_id);
  }

}
