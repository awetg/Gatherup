import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppConstantProvider } from '../../providers/app-constant/app-constant';
import { UserInfoDescription } from '../../interface/user';
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

  user: UserInfoDescription = { fullname: '', email: '', interest: [] };
  file: File;
  fileData;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public appConstant: AppConstantProvider,
    public authProvider: AuthProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  updateProfile($event) {
    $event.preventDefault();
    Object.keys(this.user).forEach(key => {
      if (this.user[key] === undefined || this.user[key].lenth < 0) {
        delete this.user[key];
      }
    });
    console.log(this.user);
    if (Object.keys(this.user).length > 0) {
      this.authProvider.updateUserInfo(this.user).catch(error => console.log(error));
    }
    if (this.file !== undefined) {
      const fd = new FormData();
      fd.append('title', this.appConstant.APP.AVATAR_TITLE);
      fd.append('file', this.file);
      this.authProvider.updateAvatar(fd)
        .then(res => console.log(res))
        .catch(error => console.log(error));
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
