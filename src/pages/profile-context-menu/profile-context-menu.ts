import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController } from 'ionic-angular';
import { SettingsProvider } from '../../providers/settings/settings';
import { AuthProvider } from '../../providers/auth/auth';
import { PageItem } from '../../interface/page';

/**
 *
 */

@IonicPage()
@Component({
  selector: 'page-profile-context-menu',
  templateUrl: 'profile-context-menu.html',
})
export class ProfileContextMenuPage {

  editProfilePage: PageItem = { title: '', component: 'EditProfilePage' };
  createEventPage: PageItem = { title: '', component: 'CreateEventPage' };

  selectedTheme: string;

  constructor(
    public navCtrl: NavController,
    private settings: SettingsProvider,
    public authProvider: AuthProvider,
    public viewCtrl: ViewController) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileContextMenuPage');
  }

  toggleAppTheme() {
    if (this.selectedTheme === 'dark-theme') {
      this.settings.setActiveTheme('light-theme');
    } else {
      this.settings.setActiveTheme('dark-theme');
    }
  }
  logout() {
    this.viewCtrl.dismiss().catch(error => console.log(error));
    this.authProvider.logOut();
  }

  openPage(page: PageItem) {
    this.navCtrl.push(page.component).catch(error => console.log(error));
  }

}
