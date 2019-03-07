import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
} from '@angular/core';
import {
  IonicPage, LoadingController,
  ModalController,
  NavController,
  NavParams, ViewController,
} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User, UserInfoDescription } from '../../interface/user';
import { EventProvider } from '../../providers/event/event';
import { Chooser } from '@ionic-native/chooser/ngx';
import { Camera } from '@ionic-native/camera';
import { EventUploadResponse } from '../../interface/event';
import { destroyView } from '@angular/core/src/view/view';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: User = { };
  selectedSegment = 'Going';
  hideMe: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,public eventProvider: EventProvider, public authProvider: AuthProvider, public modalCtrl: ModalController
  ) {
  }

  presentProfileModal() {
    let profileModal = this.modalCtrl.create(EditPicturePage, { user_id: '/tag' });
    profileModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.showUserInfo();
  }

  showUserInfo() {
    const userData = JSON.parse(localStorage.getItem('userData'));
    for (const k in userData) this.user[k] = userData[k];
  }

  ionViewCanEnter() {
    return this.authProvider.canEnterPage();
  }
  toEdit(){
    this.hideMe = !this.hideMe;
  }
}

@Component({
  selector: 'page-edit-picture',
  templateUrl: 'edit-picture.html',
})
 class EditPicturePage {

  hideMe: boolean;
  file: any;
  fileData;
  type = '';
  fileChosen = false;
  constructor(private elementRef: ElementRef, private renderer: Renderer2, private _storage: Storage, public navCtrl: NavController, public authProvider: AuthProvider, public chooser: Chooser,
              public camera: Camera, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public viewCtrl: ViewController, params: NavParams

  ) {
    this.renderer.selectRootElement( 'alert-content').scrollIntoView();
    console.log('User_id', params.get('user_id'))
    //this.viewCtrl.dismiss()
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPicturePage');
  }

  loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Your file is uploading...',
  });

  handleChange($event) {
    this.file = $event.target.files[0];
  }

  upload() {


    this.loading.present().catch(e => console.log(e));

    const fd = new FormData();
    fd.append('file', this.file);

    this.authProvider.uploadMedia(fd).subscribe(
      (response: EventUploadResponse) => {
        console.log(response);
        setTimeout(() => {
            this.loading.dismiss().catch(e => console.log(e));
            this.navCtrl.pop().catch(e => console.log(e));
          },
          2000,
        );
      }
    );
  }

  chooseFile() {
    this.chooser.getFile('image/*').then(file => {
      this.file = new Blob([file.data], { type: file.mediaType });
      this.fileData = file.uri;
      this.fileChosen = true;
    }).catch(e => console.error(e));
  }
  dismiss(){
    this.hideMe = !this.hideMe;

  }

}
