import { Component } from '@angular/core';
import {
  IonicPage,
  LoadingController,
  NavController,
  NavParams, ViewController,
} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { AppConstantProvider } from '../../providers/app-constant/app-constant';

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
  constructor(
    public viewCtrl: ViewController) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPictureContextPage');
  }
  selectMenu(item) {
    this.viewCtrl.dismiss(item).catch(error => console.log(error));
  }

}
