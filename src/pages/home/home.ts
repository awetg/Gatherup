import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { AuthProvider } from '../../providers/auth/auth';
import { Event } from '../../interface/event';
import { UserDBMedia } from '../../interface/user';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  selectedSegment = 'explore';

  userInterestSet = false;

  eventsByInterestCategory: Event[] = [];
  topEvents: Event[] = [];

  userDB: UserDBMedia = {};

  constructor(
    public navCtrl: NavController,
    public eventProvider: EventProvider,
    public authProvider: AuthProvider) {

    this.filterTopEvents();

    this.authProvider.userDB.subscribe(
      userdb => {
        if (userdb.description !== undefined) {
          this.userDB = userdb;
          this.userInterestSet = userdb.description.interest !== undefined ? userdb.description.interest.length > 0 : false;
          this.filterEventsByInterest();
        }
      });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  ionViewCanEnter() {
    return this.authProvider.canEnterPage();
  }

  filterEventsByInterest() {
    if (this.userInterestSet) {
          this.eventProvider.events$.subscribe(
            events => {
              if (this.userDB.description !== undefined) {
                  const filtered = events.filter(e => e.description.category.some(c => this.userDB.description.interest.includes(c)));
                  this.eventsByInterestCategory.push.apply(this.eventsByInterestCategory, filtered.reverse());
              }
            }
      );
    }
  }

  filterTopEvents() {
    this.eventProvider.events$.subscribe(
      events => {
        this.topEvents = events.sort((event1, event2) => {
          const [ e1, e2 ] = [ event1.description, event2.description];
          const timeDiff = new Date(e1.start_time).getTime() - new Date(e2.start_time).getTime();
          if (timeDiff !== 0) return -timeDiff;
          return -((e1.attendees ? e1.attendees.length : 0) - (e2.attendees ? e2.attendees.length : 0));
        });
      }
    );
  }

}
