import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { CheckUserResponse, SignUpForm } from '../../interface/user';
import { AuthProvider } from '../../providers/auth/auth';
import { PageItem } from '../../interface/page';
import { AppConstantProvider } from '../../providers/app-constant/app-constant';

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
  passwordConfirmed = false;
  usernameAvailable = false;
  LoginPage: PageItem = { title: 'SignUp', component: 'LoginPage' };


  constructor(
    public navCtrl: NavController,
    public authProvider: AuthProvider,
    public appConstant: AppConstantProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  register($event) {
    $event.preventDefault();
    if (this.confirmPasswordFunc()) {
      this.authProvider.register(this.user).catch(error => console.log(error));
    }
    return false;
  }

  checkUsername() {
    if (this.user.username !== undefined && this.user.username.length >= 3) {
      this.authProvider.checkUsername(this.user.username).subscribe(
        (response: CheckUserResponse) => {
          response.available ? this.usernameAvailable = true : this.usernameAvailable = false;
        },
        error => {
          console.log(error);
          this.usernameAvailable = false;
        }
      );
    }
  }

  confirmPasswordFunc(): boolean {
    if (this.user.password !== undefined) {
      if (this.user.password === this.user.confirmPassword) {
        this.passwordConfirmed = true;
        return true;
      }
    }
    this.passwordConfirmed = false;
    return false;
  }

  openPage(page: PageItem) {
    this.navCtrl.setRoot(page.component).catch(error => console.log(error));
  }
}
