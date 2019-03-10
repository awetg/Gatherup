import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstantProvider } from '../app-constant/app-constant';
import { Event, PlaceAutocompleteResponse } from '../../interface/event';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { User } from '../../interface/user';
import { Comments } from '../../interface/comments';
import { MediaProvider } from '../media/media';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EventProvider {

  private _events: BehaviorSubject<Event[]> = new BehaviorSubject<Event[]>([]);
  readonly events$: Observable<Event[]> = this._events.asObservable();

  constructor(
    public http: HttpClient,
    public appConstant: AppConstantProvider,
    public mediaProvider: MediaProvider) {
    console.log('Hello EventProvider Provider');
    this.loadEvents();
  }

  loadEvents() {
    console.log('Loading Events');
    this.mediaProvider.getEventMedias().subscribe(
      (events: Event[]) => {
        if (this._events.getValue().length < events.length) {
          this._events.next(events.map(e => {
            const desc = JSON.parse(e.description as string);
            e.description = desc;
            return e;
          }));
        }
      }
    );
  }

  async addEvent(data: any): Promise<any> {
    const uploadResponse = await this.mediaProvider.uploadMedia(data);
    return this.mediaProvider.tagMedia(uploadResponse.file_id, this.appConstant.APP.EVENT_TAG);

  }

  loadSingleEvent(file_id: number) {
    this.mediaProvider.getEventMedia(file_id).subscribe(
      (event) => {
        this._events.next(this._events.getValue().push.apply(this._events.getValue(), event));
        return event;
      },
      error => console.log(error)
    );
  }

  async getPlacePredictions(queryJson): Promise<PlaceAutocompleteResponse> {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + queryJson + '.json?access_token=pk.eyJ1Ijoia2FsYXkiLCJhIjoiY2p0MHAwamM2MDYwejQzcXU1anF6Z2lzMiJ9.fcb4riEtQstZaSzMxluPuA';
    return this.http.get<PlaceAutocompleteResponse>(url).toPromise();
  }

  fetchOrganizer(user_id: number){
    const httpOptions = {
      headers: new HttpHeaders({
          'x-access-token': localStorage.getItem('token'),
        },
      ),
    };
    return this.http.get<User>(this.appConstant.API.API_ENDPOINT + '/users/' + user_id, httpOptions).toPromise();
  }

  fetchComment(file_id: number){
    return this.http.get<Comments>(this.appConstant.API.API_ENDPOINT + '/comments/file/' + file_id).toPromise();
  }

}
