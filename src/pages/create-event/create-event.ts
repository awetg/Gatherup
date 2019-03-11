import { Component } from '@angular/core';
import { IonicPage, LoadingController, ModalController, NavController, PopoverController } from 'ionic-angular';
import { EventDescription, PlaceItem } from '../../interface/event';
import { AppConstantProvider } from '../../providers/app-constant/app-constant';
import { EventProvider } from '../../providers/event/event';
import { AuthProvider } from '../../providers/auth/auth';

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

  constructor(
    public navCtrl: NavController,
    public popoverCtrl: PopoverController,
    public modalCtrl: ModalController,
    public appConstant: AppConstantProvider,
    public authProvider: AuthProvider,
    public eventProvider: EventProvider,
    public loadingCtrl: LoadingController) {
  }

  loading = this.loadingCtrl.create({
    spinner: 'ios',
    content: 'Your event is uploading...',
  });

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

  CreateEvent(event) {
    event.preventDefault();

    /* If location or photo for event is not added show error and return */
    if (this.description.location === undefined || this.description.location.length < 0) {
      this.locationError = true;
    } else {
      if (this.file === undefined) {
        this.fileError = true;
        return;
      }

      /* Get time inserted time and show error if difference between start date and end date is less than 30 in minutes */
      this.description.start_time = new Date(this.startDate + ' ' + this.startTime);
      this.description.end_time = new Date(this.endDate + ' ' + this.endTime);
      const minDiff = Math.floor((this.description.start_time.getTime() - this.description.end_time.getTime()) / 60000);
      if (minDiff < 30) {
        this.endTimeError = true;
      }

      /* Prepare event upload data like file, title and event description and upload */
      const user = this.authProvider.getUser();
      const userDB = this.authProvider.getUserDB();
      this.description.organizer = { username: user.username, avatar_id: userDB.avatar_id };
      this.loading.present().catch(error => console.log(error));
      const fd = new FormData();
      fd.append('file', this.file);
      fd.append('title', this.title);
      fd.append('description', JSON.stringify(this.description));
      this.eventProvider.addEvent(fd).then(
        res => {
          setTimeout(() => {
            this.loading.dismiss().catch(error => console.log(error));
            this.navCtrl.pop().catch(error => console.log(error));
          },
          2000,
        );
        }
      ).catch(error => console.log(error));
    }
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
