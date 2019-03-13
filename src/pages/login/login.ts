import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LogInForm } from '../../interface/user';
import { AuthProvider } from '../../providers/auth/auth';
import { PageItem } from '../../interface/page';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: LogInForm = { };
  RegisterPage: PageItem = { title: 'SignUp', component: 'RegisterPage' };
  loginError = false;

  constructor(
    public navCtrl: NavController,
    public auth: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // login function
  logIn() {
    this.auth.logIn(this.user).catch(error => {
      console.log(error.error.message);
      if (error.error.message === 'Authentication failed due bad password') {
        this.loginError = true;
      }
    });
  }
  // switching to another page
  openPage(page: PageItem) {
    this.navCtrl.setRoot(page.component).catch(error => console.log(error));
  }

}
