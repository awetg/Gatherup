import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

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

  constructor(public navCtrl: NavController) {
    console.log('tabs menu');
  }

}
