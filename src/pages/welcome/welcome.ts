import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PageItem } from '../../interface/page';
import { EventProvider } from '../../providers/event/event';
import { AuthProvider } from '../../providers/auth/auth';

/**
 *
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  logInPage: PageItem = { title: 'LogIn', component: 'LoginPage' };
  RegisterPage: PageItem = { title: 'SignUp', component: 'RegisterPage' };

  constructor(public navCtrl: NavController, public eventProvider: EventProvider, public authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  ionViewCanEnter() {
    return !this.authProvider.canEnterPage();
  }

  openPage(page: PageItem) {
    this.navCtrl.setRoot(page.component).catch(error => console.log(error));
  }

}
