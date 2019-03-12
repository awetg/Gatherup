import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { AuthProvider } from '../../providers/auth/auth';
import { Event } from '../../interface/event';

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

  constructor(
    public navCtrl: NavController,
    public eventProvider: EventProvider,
    public authProvider: AuthProvider) {
    this.authProvider.userDB.subscribe(
      userdb => {
        if (userdb.description !== undefined) {
          this.userInterestSet = userdb.description.interest !== undefined ? userdb.description.interest.length > 0 : false;
        }
      }
    );

    this.filterEventsByInterest();
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
          this.authProvider.userDB.subscribe(
            userDb => {
              if (userDb.description !== undefined) {
                userDb.description.interest.forEach(category => {
                  const filtered = events.filter(e => e.description.category.includes(category));
                  this.eventsByInterestCategory.push.apply(this.eventsByInterestCategory, filtered);
                });
              }
            }
          );
        }
      );
    }
  }

}
