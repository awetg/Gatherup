import { Component } from '@angular/core';
import { IonicPage, LoadingController, ModalController, NavController, PopoverController } from 'ionic-angular';
import { EventDescription, PlaceItem } from '../../interface/event';
import { AppConstantProvider } from '../../providers/app-constant/app-constant';
import { EventProvider } from '../../providers/event/event';
import { AuthProvider } from '../../providers/auth/auth';
import { User, UserDBMedia } from '../../interface/user';

/**
 * Generated class for the CreateEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {

  subComponents = {
    autocompleteComponenet: 'PlaceAutocompletePage'
  };

  file: File;
  fileData;
  title: string;
  description: EventDescription = { coordinates: { lng: 0, lat: 0 } };
  startTime: string;
  startDate: string;
  endTime: string;
  endDate: string;
  minDate = new Date(Date.now()).toISOString();

  locationError = false;
  fileError = false;
  endTimeError = false;

  selectedCategory: string[];

  user: User = {};
  userDB: UserDBMedia = {};

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    public appConstant: AppConstantProvider,
    public authProvider: AuthProvider,
    public eventProvider: EventProvider,
    public loadingCtrl: LoadingController) {
      this.authProvider.user.subscribe(user => {
        if (user !== undefined) this.user = user;
      });
      this.authProvider.userDB.subscribe(db => {
        if (db.description !== undefined) {
          this.userDB = db;
        }
      });
  }

  loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Your event is uploading...',
  });

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

  async CreateEvent(event) {
    event.preventDefault();


    /* If location or photo for event is not added show error and return */
    if (this.description.location === undefined || this.description.location.length < 0) {
      this.locationError = true;
      return;
    } else {
      this.locationError = false;
    }

    /* if file not selected show error and return */
    if (this.file === undefined) {
      this.fileError = true;
      return;
    } else {
      this.fileError = false;
    }


    /* Get time inserted time and show error if difference between start date and end date is less than 30 in minutes */
    this.description.start_time = new Date(this.startDate + ' ' + this.startTime);
    this.description.end_time = new Date(this.endDate + ' ' + this.endTime);
    const minDiff = Math.floor((this.description.end_time.getTime() - this.description.start_time.getTime()) / 60000);

    /* if time dif bewteen start and end time is less tha 30 show error and return */
    console.log(minDiff)
    if (minDiff < 30) {
      this.endTimeError = true;
      return;
    } else {
      this.endTimeError = false;
    }

    /* Prepare event upload data like file, title and event description and upload */
    this.description.organizer = { username: this.user.username, avatar_id: this.userDB.description.avatar_id };
    this.loading.present().catch(error => console.log(error));
    const fd = new FormData();
    fd.append('file', this.file);
    fd.append('title', this.title);
    fd.append('description', JSON.stringify(this.description));


    this.eventProvider.addEvent(fd).then(
      (res) => {

        /* dimiss loading progress indicator */
        setTimeout(() => {
          this.loading.dismiss().catch(error => console.log(error));
          this.navCtrl.pop().catch(error => console.log(error));
        },
          2000,
        );
      }
    ).catch(error => console.log(error));
  }

  openPopover(ev: any, popoverComponet: any, onDismiss: any) {
    const popover = this.popoverCtrl.create(popoverComponet);
    if (onDismiss !== undefined) {
      popover.onDidDismiss(onDismiss.bind(this));
    }
    popover.present({ ev }).catch(error => console.log(error));
  }

  openModal(ev: any, popoverComponet: any, onDismiss: any) {
    const modal = this.modalCtrl.create(popoverComponet);
    if (onDismiss !== undefined) {
      modal.onDidDismiss(onDismiss.bind(this));
    }
    modal.present().catch(error => console.log(error));
  }

  autoCompleteOnDismiss(item: PlaceItem) {
    this.description.location = item.place_name;
    this.description.coordinates.lng = item.geometry.coordinates[0];
    this.description.coordinates.lat = item.geometry.coordinates[1];
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
