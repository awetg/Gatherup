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
  NavParams, PopoverController, ViewController,
} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { User, UserInfoDescription } from '../../interface/user';
import { EventProvider } from '../../providers/event/event';
import { Chooser } from '@ionic-native/chooser/ngx';
import { Camera } from '@ionic-native/camera';
import { EventUploadResponse } from '../../interface/event';
import { destroyView } from '@angular/core/src/view/view';
import { SettingsProvider } from '../../providers/settings/settings';
import { EditPicturePage } from '../edit-picture/edit-picture';
import { DotmenuPage } from '../dotmenu/dotmenu';

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
  selectedTheme: String;
  user: User = { };
  selectedSegment = 'Going';
  hideMe: boolean;
  value = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,public eventProvider: EventProvider, public authProvider: AuthProvider, public modalCtrl: ModalController, private settings: SettingsProvider,
              private popoverController: PopoverController,
  ) {
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
  }
  toggleAppTheme(){
    if (this.selectedTheme == 'light-theme'){
      this.settings.setActiveTheme('dark-theme');
    } else {
      this.settings.setActiveTheme('light-theme');
    }
  }

  async openEdit(ev: Event){
    const popover = await this.popoverController.create({
      component: EditPicturePage,
      componentProps: {
        custom_id: this.value
      },
      ev: ev
    });
    popover.present();
  }

  openDotmenu(myEvent) {
    let popover = this.popoverController.create(DotmenuPage);
    popover.present({
      ev: myEvent
    });
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

