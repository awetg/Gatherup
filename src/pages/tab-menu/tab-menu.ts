import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { PageItem } from '../../interface/page';
import { FirstRunPage } from '..';

/**
 * Generated class for the TabMenuPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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

  firsRunPage = { title: '', component: FirstRunPage };

  userLoggedIn = false;


  constructor(public navCtrl: NavController, public auth: AuthProvider) {
    this.userLoggedIn = auth.isLoggedIn();
    if (!this.userLoggedIn) this.openPage(this.firsRunPage);
  }

  openPage(page: PageItem) {
    this.navCtrl.setRoot(page.component).catch(error => console.log(error));
  }

}
