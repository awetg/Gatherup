import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PageItem } from '../../interface/page';
import { AuthProvider } from '../../providers/auth/auth';
import { MainPage } from '..';
import { EventProvider } from '../../providers/event/event';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  logInPage: PageItem = { title: 'LogIn', component: 'LoginPage' };
  signUpPage: PageItem = { title: 'SignUp', component: 'LoginPage' };
  mainPage: PageItem = { title: '', component: MainPage };

  userLoggedIn = false;

  constructor(public navCtrl: NavController, public auth: AuthProvider, public eventProvider: EventProvider) {
    this.userLoggedIn = auth.isLoggedIn();
    if (this.userLoggedIn) this.openPage(this.mainPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  openPage(page: PageItem) {
    this.navCtrl.setRoot(page.component).catch(error => console.log(error));
  }

}
