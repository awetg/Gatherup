import { Component } from '@angular/core';
import { IonicPage, Platform, ViewController } from 'ionic-angular';

/**
 * Generated class for the EditPictureContextPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-picture-context',
  templateUrl: 'edit-picture-context.html',
})
export class EditPictureContextPage {

  isApp = false;
  constructor(public viewCtrl: ViewController, public platform: Platform) {
      this.isApp = this.platform.is('core') || this.platform.is('mobileweb') ? false : true;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPictureContextPage');
  }
  selectMenu(item) {
    this.viewCtrl.dismiss(item).catch(error => console.log(error));
  }

}
