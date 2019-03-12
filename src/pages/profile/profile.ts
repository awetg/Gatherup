import { Component } from '@angular/core';
import { IonicPage, NavController, PopoverController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { AuthProvider } from '../../providers/auth/auth';
import { PageItem } from '../../interface/page';
import { User } from '../../interface/user';

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

  editProfilePage: PageItem = { title: '', component: 'EditProfilePage' };
  createEventPage: PageItem = { title: '', component: 'CreateEventPage' };
  subComponents = {
    profileContextMenu: 'ProfileContextMenuPage',
  };

  selectedTheme: string;
  selectedSegment = 'going';

  ownEventsFilter = e => e.user_id === this.user.user_id;
  joinedEventsFilter = e => e.description.attendees ? e.description.attendees.includes(this.user.user_id) : false;
  interstedEventsFilter = e => e.description.interested ? e.description.interested.includes(this.user.user_id) : false;

  user: User = {};

  constructor(
    public navCtrl: NavController,
    public eventProvider: EventProvider,
    public authProvider: AuthProvider,
    private popoverCtrl: PopoverController) {
    this.authProvider.user.subscribe(user => this.user = user);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewCanEnter() {
    return this.authProvider.canEnterPage();
  }

  openPopover(ev: any, popoverComponet: any, onDismiss: any) {
    const popover = this.popoverCtrl.create(popoverComponet);
    if (onDismiss !== undefined) {
      popover.onDidDismiss(onDismiss.bind(this));
    }
    popover.present({ ev }).catch(error => console.log(error));
  }

  openPage(page: PageItem) {
    this.navCtrl.push(page.component).catch(error => console.log(error));
  }

}

