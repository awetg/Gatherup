import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Comment } from '../../interface/media';
import { EventProvider } from '../../providers/event/event';
import { AuthProvider } from '../../providers/auth/auth';
import { User } from '../../interface/user';

/**
 *
 */

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {

  event: any;
  selectedSegment = 'details';
  newComment = '';
  commentArr: Comment[];
  joined = false;
  interested = false;
  user: User = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public eventProvider: EventProvider,
    public authProvider: AuthProvider) {

      /* get passed param single event to show details of the event */
      this.event = navParams.get('event');

      /* get logged in user to check whether user alread joined/interested on the event and further action depending on that */
      this.authProvider.user.subscribe(user => {
        if (user !== undefined) {
          this.user = user;
          this.setStatus(); // set UI as interestd/not interested and joined/not joined for current user
          this.getComments(); // get all comments belonging to current event
        } else {
          /* if none logged in user try to see event details redirect to login */
          this.navCtrl.push('LoginPage').catch(error => console.log(error));
        }
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

  /**
   * Add the comment on the media (event)
   */
  addComment() {
    if (this.newComment.length > 0) {
      this.mediaProvider.addMediaComment(this.event['file_id'], this.newComment).subscribe(res => {
        this.newComment = '';
        this.getComments();
      });
    }
  }

  /**
   * Fetch the comments on the event
   */
  getComments() {
    this.mediaProvider.getMediaComment(this.event['file_id']).subscribe(comments => this.commentArr = comments);
  }

  /**
   * Join the event
   */
  async joinEvent() {
    const file_id = this.event['file_id'];
    if (this.joined) {
      this.authProvider.deleteJoinEvent(file_id)
        .then(res => this.joined = false)
        .catch(error => console.log(error));
    } else {
      this.authProvider.joinEvent(file_id)
        .then(res => this.joined = true)
        .catch(error => console.log(error));
    }
  }

  /**
   * Add event in the interested list
   */
  async addInterested() {
    const file_id = this.event['file_id'];
    if (this.interested) {
      console.log('delete interest ', this.joined);
      this.mediaProvider.deleteFavourite(file_id).toPromise()
        .then(res => this.interested = false)
        .catch(error => console.log(error));
    } else {
      console.log('add interest ', this.joined);
      this.mediaProvider.createFavourite(file_id).toPromise()
        .then(res => this.interested = true)
        .catch(error => console.log(error));
    }
  }

  /**
   * Checks if the user already joined or interested in the event
   */
  setStatus() {
    this.authProvider.userDB.subscribe(userdb => {
      if (userdb.description.joinedEvents !== undefined) {
        this.joined = userdb.description.joinedEvents.some(id => id === this.event['file_id']);
      }
    });

    this.mediaProvider.getFavouriteById(this.event['file_id']).subscribe(favorites => {
      this.interested = favorites.some(f => f.user_id === this.user.user_id);
      console.log(this.interested);
    });
  }

}
