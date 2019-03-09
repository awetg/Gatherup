import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  CheckUserResponse,
  LogInForm, RegisterResponse,
  SignUpForm,
} from '../../interface/user';
import { AuthProvider } from '../../providers/auth/auth';
import { PageItem } from '../../interface/page';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user: SignUpForm = { };
  @ViewChild('registerForm') registerForm: any;
  passwordConfirmed = false;
  usernameAvailable = false;
  LoginPage: PageItem = { title: 'SignUp', component: 'LoginPage' };


  constructor(public navCtrl: NavController, public navParams: NavParams, public authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  register() {
    if (this.usernameAvailable && this.confirmPasswordFunction) {
      this.authProvider.register(this.user);
    }
  }
  checkUser() {
    if (this.user.username !== undefined && this.user.username.length >= 3) {
      this.authProvider.checkUser(this.user.username).subscribe(
        (response: CheckUserResponse) => {
          if (response.available) {
            this.usernameAvailable = true;
          }
        }
      );
    }
  }

  confirmPasswordFunction() {
    if (this.user.password !== undefined) {
      if (this.user.password === this.user.confirmPassword) {
        this.passwordConfirmed = true;
      }
    }
  }

  openPage(page: PageItem) {
    this.navCtrl.setRoot(page.component).catch(error => console.log(error));
  }
}
