import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../interface/user';
import { EventProvider } from '../../providers/event/event';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  user: User = { };
  selectedSegment = 'Going';

  constructor(public navCtrl: NavController, public navParams: NavParams,public eventProvider: EventProvider, public authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.showUserInfo();
  }

  showUserInfo() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    for (const k in userData) this.user[k] = userData[k];
  }

  ionViewCanEnter() {
    return this.authProvider.canEnterPage();
  }

}
