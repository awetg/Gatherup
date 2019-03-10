import { Component } from '@angular/core';
import { IonicPage, LoadingController, ModalController, NavController, PopoverController } from 'ionic-angular';
import { EventDescription, PlaceItem } from '../../interface/event';
import { AppConstantProvider } from '../../providers/app-constant/app-constant';
import { AuthProvider } from '../../providers/auth/auth';
import { EventProvider } from '../../providers/event/event';

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
  locationError = false;
  fileError = false;

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
    content: 'Your file is uploading...',
  });

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }

  CreateEvent(event) {
    event.preventDefault();
    if (this.description.location === undefined || this.description.location.length < 0) {
      this.locationError = true;
    } else {
      if (this.file === undefined) {
        this.fileError = true;
        return;
      }
      this.description.start_time = new Date(this.startDate + ' ' + this.startTime);
      this.description.end_time = new Date(this.endDate + ' ' + this.endTime);
      const user = this.authProvider.getUser();
      this.description.organizer = { username: user.username, avatar: 'ab6e8a71b39981a6422125f476d40005-tn160.png' };
      this.loading.present().catch(error => console.log(error));
      const fd = new FormData();
      fd.append('file', this.file);
      fd.append('title', this.title);
      fd.append('description', JSON.stringify(this.description));
      this.eventProvider.addEvent(fd).then(
        res => {
          setTimeout(() => {
            this.loading.dismiss().catch(e => console.log(e));
            this.navCtrl.pop().catch(e => console.log(e));
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
