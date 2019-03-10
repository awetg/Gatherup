import {
  Component,
  ElementRef,
  Input, OnInit, Renderer2,
} from '@angular/core';
import {
  IonicPage,
  LoadingController, ModalController,
  NavController,
  NavParams, PopoverController, ViewController,
} from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
// import { Camera, CameraOptions } from '@ionic-native/camera';
// import { Chooser } from '@ionic-native/chooser/ngx';
// import { EventUploadResponse } from '../../interface/event';
import { PageItem } from '../../interface/page';
import { EditProfilePage } from '../edit-profile/edit-profile';

@IonicPage()
@Component({
  selector: 'page-edit-picture',
  templateUrl: 'edit-picture.html',
})
export class EditPicturePage implements OnInit {

  passedId = null;
  file: any;
  fileData;
  type = '';
  fileChosen = false;
  @Input() popover: any;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private _storage: Storage,
    public navCtrl: NavController,
    public authProvider: AuthProvider,
    // public chooser: Chooser,
    // public camera: Camera,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public viewCtrl: ViewController,
    private navParams: NavParams,
    private popoverController: PopoverController

  ) {}

  ngOnInit() {
    this.passedId = this.navParams.get('custom_id');
  }

  // closePopover() {
  //   this.popover.dismiss();
  // }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPicturePage');
  }

  // loading = this.loadingCtrl.create({
  //   spinner: 'ios',
  //   content: 'Your file is uploading...',
  // });

  // handleChange($event) {
  //   this.file = $event.target.files[0];
  // }

  // upload() {


  //   this.loading.present().catch(e => console.log(e));

  //   const fd = new FormData();
  //   fd.append('file', this.file);

  //   this.authProvider.uploadMedia(fd).subscribe(
  //     (response: EventUploadResponse) => {
  //       console.log(response);
  //       setTimeout(() => {
  //           this.loading.dismiss().catch(e => console.log(e));
  //           this.navCtrl.pop().catch(e => console.log(e));
  //         },
  //         2000,
  //       );
  //     }
  //   );
  // }

  // chooseFile() {
  //   this.chooser.getFile('image/*, video/*, audio/*').then(file => {
  //     this.file = new Blob([file.data], { type: file.mediaType });
  //     this.fileData = file.uri;
  //     this.fileChosen = true;
  //   }).catch(e => console.error(e));
  // }


}
