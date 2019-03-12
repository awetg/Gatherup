import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConstantProvider } from '../app-constant/app-constant';
import { Event } from '../../interface/event';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { MediaProvider } from '../media/media';
import { MediaUploadResponse } from '../../interface/media';

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

  async addEvent(data: any): Promise<MediaUploadResponse> {
    try {
      const uploadResponse = await this.mediaProvider.uploadMedia(data);
      this.mediaProvider.tagMedia(uploadResponse.file_id, this.appConstant.APP.EVENT_TAG).catch(error => console.log(error));
      return uploadResponse;
    } catch (error) {
      console.log(error);
    }
  }

  async joinEvent(file_id: number, user_id: number) {
    try {

      const event = this._events.getValue().find(e => e.file_id === file_id);
      const currentDB = event.description;
      const userExits = currentDB.attendees !== undefined ? currentDB.attendees.includes(user_id) : false;
      if (!userExits) {
        currentDB.attendees !== undefined ? currentDB.attendees.push(user_id) : currentDB.attendees = [user_id] ;
        const payload = { 'description': JSON.stringify(currentDB) };
        const message = await this.mediaProvider.updateMedia(file_id, payload).catch(error => console.log(error));
        this.loadEvents();
        return message;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteJoin(file_id: number, user_id: number) {
    try {

      const event = this._events.getValue().find(e => e.file_id === file_id);
      const currentDB = event.description;
      const index = currentDB.attendees !== undefined ? currentDB.attendees.indexOf(user_id) : -1;
      if (index >= 0) {
        currentDB.attendees.splice(index, 1);
        const payload = { 'description': JSON.stringify(currentDB) };
        const message = await this.mediaProvider.updateMedia(file_id, payload).catch(error => console.log(error));
        this.loadEvents();
        return message;
      }
    } catch (error) {
      console.log(error);
    }
  }


  async addInterested(file_id: number, user_id: number) {
    try {

      const event = this._events.getValue().find(e => e.file_id === file_id);
      const currentDB = event.description;
      const userExits = currentDB.interested !== undefined ? currentDB.interested.includes(user_id) : false;
      if (!userExits) {
        currentDB.interested !== undefined ? currentDB.interested.push(user_id) : currentDB.interested = [user_id] ;
        const payload = { 'description': JSON.stringify(currentDB) };
        const message = await this.mediaProvider.updateMedia(file_id, payload).catch(error => console.log(error));
        this.loadEvents();
        return message;
      }
    } catch (error) {
      console.log(error);
    }

  }

  async deleteInterested(file_id: number, user_id: number) {
    try {

      const event = this._events.getValue().find(e => e.file_id === file_id);
      const currentDB = event.description;
      const index = currentDB.interested !== undefined ? currentDB.attendees.indexOf(user_id) : -1;
      if (index >= 0) {
        currentDB.interested.splice(index, 1);
        const payload = { 'description': JSON.stringify(currentDB) };
        const message = await this.mediaProvider.updateMedia(file_id, payload).catch(error => console.log(error));
        this.loadEvents();
        return message;
      }
    } catch (error) {
      console.log(error);
    }
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

  query(queryTerm: string) {
    return this.events$.map(events => events.filter(e => {
      const fields = e.title + ',' + e.description.category.toString() + ',' + e.description.location;
      return fields.toLowerCase().includes(queryTerm.toLowerCase());
    }));
  }

}
