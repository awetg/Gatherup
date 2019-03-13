import { Component, ElementRef, Renderer, ViewChild } from '@angular/core';
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
 *
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

  @ViewChild('fileInput') fileInput: ElementRef;

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
    private camera: Camera,
    private renderer: Renderer) {
  }

  loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Your profile is updating...',
  });

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 70,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
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
      this.triggerClick();
    } else if (item === 'camera') {
      this.takePicture();
    }
  }

  async updateProfile($event) {
    $event.preventDefault();

    this.loading.present().catch(error => console.log(error));

    /* create promise array to get response after all promise are resolved */
    const promiseArr = [];

    /* if fullname or/and interest are given update user database file first before uploading avatar
    if each promis
     */
    if (this.user.full_name.length > 0 || this.user.interest.length > 0) {
      promiseArr.push(this.authProvider.updateUserDBMedia(this.user));
    }


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


    if (promiseArr.length > 0) {
      Promise.all(promiseArr)
      .then(res => this.dismissLoading())
      .catch(error => console.log(error));
    } else {
      this.dismissLoading();
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


  dismissLoading() {
    setTimeout(() => {
        this.loading.dismiss().catch(e => console.log(e));
        this.navCtrl.pop().catch(error => console.log(error));
      },
      2000,
    );
  }

  triggerClick() {
    const event = new MouseEvent('click', { bubbles: true, cancelable: true });
    event.stopPropagation();
    this.renderer.invokeElementMethod(this.fileInput.nativeElement, 'dispatchEvent', [event]);
  }
}
