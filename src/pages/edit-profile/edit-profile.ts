import { Component } from '@angular/core';
import { IonicPage, LoadingController, NavController, NavParams } from 'ionic-angular';
import { AppConstantProvider } from '../../providers/app-constant/app-constant';
import { UserDBDescription } from '../../interface/user';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  user: UserDBDescription = { full_name: '', interest: [] };
  email = '';
  file: File;
  fileData;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appConstant: AppConstantProvider,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController) {
  }

  loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Your profile is updating...',
  });

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  updateProfile($event) {
    $event.preventDefault();
    const promiseArr = [];
    if (this.email.length > 0) {
      const data = { 'email': this.email };
      promiseArr.push(this.authProvider.updateUserInfo(data));
    }
    if (this.file !== undefined) {
      const fd = new FormData();
      fd.append('title', this.appConstant.APP.AVATAR_TITLE);
      fd.append('file', this.file);
      promiseArr.push(this.authProvider.updateAvatar(fd));
    }
    if (this.user.full_name.length > 0 || this.user.interest.length > 0) {
      promiseArr.push(this.authProvider.updateUserDBMedia(this.user));
    }

    if (promiseArr.length > 0) {
      this.loading.present().catch(error => console.log(error));
      Promise.all(promiseArr)
      .then(
        res => {
          setTimeout(() => {
              this.loading.dismiss().catch(e => console.log(e));
              this.navCtrl.pop().catch(error => console.log(error));
            },
          2000,
          );
        }
      )
      .catch(error => console.log(error));
    } else {
      this.navCtrl.pop().catch(error => console.log(error));
    }
  }

  addFile($event) {
    this.file = $event.target.files[0];
    this.readFile();
  }

  readFile() {
    const reader = new FileReader();
    reader.onloadend = (evt) => {
      this.fileData = reader.result;
    };
    reader.readAsDataURL(this.file);
  }
}
