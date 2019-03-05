import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { PageItem } from '../../interface/page';
import { EventProvider } from '../../providers/event/event';
import { AuthProvider } from '../../providers/auth/auth';

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
  signUpPage: PageItem = { title: 'SignUp', component: 'SignupPage' };

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
