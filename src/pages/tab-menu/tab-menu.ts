import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { FirstRunPage } from '..';

/**
 *
 */

@IonicPage()
@Component({
  selector: 'page-tab-menu',
  templateUrl: 'tab-menu.html'
})
export class TabMenuPage {

  homeRoot = 'HomePage';
  searchRoot = 'SearchPage';
  profileRoot = 'ProfilePage';

  constructor(public navCtrl: NavController, public authProvider: AuthProvider) {
    console.log('tabs menu');
    if (!this.authProvider.canEnterPage()) {
      this.navCtrl.setRoot(FirstRunPage).catch(error => console.log(error));
    }
  }

}
