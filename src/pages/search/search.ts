import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { Event } from '../../interface/event';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  currentEvents: Event[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  query($event) {
    const val = $event.target.value;
    if (!val || !val.trim()) {
      this.currentEvents = [];
      return;
    }
    this.eventProvider.query(val).subscribe(events => {
      this.currentEvents = events;
    });
  }

}
