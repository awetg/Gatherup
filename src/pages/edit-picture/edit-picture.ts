import {
  AfterViewInit,
  Component,
  ElementRef,
  Input, Renderer2,
} from '@angular/core';
import {
  IonicPage,
  LoadingController, ModalController,
  NavController,
  NavParams, ViewController,
} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Chooser } from '@ionic-native/chooser/ngx';
import { EventUploadResponse } from '../../interface/event';





/**
 * Generated class for the EditPicturePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-picture',
  templateUrl: 'edit-picture.html',
})
export class EditPicturePage implements AfterViewInit{

  private _force :boolean = false;
  file: any;
  fileData;
  type = '';
  fileChosen = false;

  @Input()
  set force(val) {
    this._force = val == '' ? true : !!val;
  }

  constructor( private elementRef : ElementRef, private renderer : Renderer2, private _storage: Storage, public navCtrl: NavController, public authProvider: AuthProvider, public chooser: Chooser,
               public camera: Camera, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public viewCtrl: ViewController, params: NavParams

  ) {
    this.renderer.selectRootElement( 'alert-content').scrollIntoView();
    console.log('User_id', params.get('user_id'))
  }

  get storage_key() {
    return `shown-overlay-${this.navCtrl.getActive().id}`;
  }

  ngAfterViewInit() {
    // Check local storage to see if we already displayed this...
    this._storage.get(this.storage_key).then( (val) => {
      if( !val || this._force )
        this.renderer.addClass( this.elementRef.nativeElement, 'shown' )
    });
  }

  hide_overlay() {
    this._storage.set(this.storage_key, 1);
    this.renderer.removeClass( this.elementRef.nativeElement, 'shown' );
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
    this.chooser.getFile('image/*, video/*, audio/*').then(file => {
      this.file = new Blob([file.data], { type: file.mediaType });
      this.fileData = file.uri;
      this.fileChosen = true;
    }).catch(e => console.error(e));
  }
}
