import { Component } from '@angular/core';
import {
  IonicPage,
  LoadingController,
  NavController,
  PopoverController,
} from 'ionic-angular';
import { AppConstantProvider } from '../../providers/app-constant/app-constant';
import { UserDBDescription } from '../../interface/user';
import { AuthProvider } from '../../providers/auth/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';

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
  file: any;
  fileData;
  subComponents = { editPictureContext: 'EditPictureContextPage' };


  constructor(
    public navCtrl: NavController,
    public appConstant: AppConstantProvider,
    public authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public popoverCtrl: PopoverController,
    private camera: Camera) {
  }

  loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Your profile is updating...',
  });

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }


  takePicture(sourceType: number) {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType,
    };

    this.camera.getPicture(options).then(
      imageData => {
        const byteString = atob(imageData);
        const dataArray = new Uint8Array(byteString.length);
        for (let i = 0; i < byteString.length; i++) {
          dataArray[i] = byteString.charCodeAt(i);
        }
        this.file = new Blob([dataArray], { type: 'image/jpeg' });
        this.fileData = 'data:image/jpeg;base64,' + imageData;
      },
      err => {
        console.log(err);
      },
    );
  }

  // open edit popover
  openPopover(ev: any, popoverComponet: any, onDismiss: any) {
    const popover = this.popoverCtrl.create(popoverComponet);
    if (onDismiss !== undefined) {
      popover.onDidDismiss(onDismiss.bind(this));
    }
    popover.present({ ev }).catch(error => console.log(error));
  }
  onDismissEditMenu(item: string) {
    if (item === 'gallery') {
      this.takePicture(0);
      console.log('gallery');
    } else if (item === 'camera') {
      this.takePicture(1);
      console.log('camera');
    }
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
