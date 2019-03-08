import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';
import { AuthProvider } from '../../providers/auth/auth';
import { EventDetailPage } from '../event-detail/event-detail';

/**
 * Generated class for the DotmenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dotmenu',
  templateUrl: 'dotmenu.html',
})
export class DotmenuPage {
  selectedTheme: String;

  constructor(public navCtrl: NavController, public navParams: NavParams, private settings: SettingsProvider, public authProvider: AuthProvider) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);

  }

  toggleAppTheme(){
    if (this.selectedTheme == 'dark-theme'){
      this.settings.setActiveTheme('light-theme');
    } else {
      this.settings.setActiveTheme('dark-theme');
    }
  }
  logout() {
    localStorage.removeItem('token');
    this.authProvider.loggedIn = false;
    this.navCtrl.setRoot(EventDetailPage).catch(e => console.log(e));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DotmenuPage');
  }

}
