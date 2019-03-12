import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Comment } from '../../interface/media';
import { EventProvider } from '../../providers/event/event';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the EventDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
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

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public mediaProvider: MediaProvider,
    public eventProvider: EventProvider,
    public authProvider: AuthProvider) {
    this.event = navParams.get('event');
    this.setStatus();
    this.getComments();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EventDetailPage');
  }

  addComment() {
    if (this.newComment.length > 0) {
      this.mediaProvider.addMediaComment(this.event['file_id'], this.newComment).subscribe(res => {
        this.newComment = '';
        this.getComments();
      });
    }
  }

  getComments() {
    this.mediaProvider.getMediaComment(this.event['file_id']).subscribe(comments => this.commentArr = comments);
  }

  async joinEvent() {
    const file_id = this.event['file_id'];
    this.authProvider.user.subscribe(user => {
      if (this.joined) {
        this.eventProvider.deleteJoin(file_id, user.user_id)
        .then(res => this.joined = false)
        .catch(error => console.log(error));
      } else {
        this.eventProvider.joinEvent(file_id, user.user_id)
        .then(res => this.joined = true)
        .catch(error => console.log(error));
      }
    });
  }

  async addInterested() {
    const file_id = this.event['file_id'];
    this.authProvider.user.subscribe(user => {
      if (this.interested) {
        this.eventProvider.deleteInterested(file_id, user.user_id)
        .then(res => this.interested = false)
        .catch(error => console.log(error));
      } else {
        this.eventProvider.addInterested(file_id, user.user_id)
        .then(res => this.interested = true)
        .catch(error => console.log(error));
      }
    });
  }

  setStatus() {
    // const user_id = await this.authProvider.user.toPromise().then(user => user.user_id);
    this.authProvider.user.subscribe(user => {
      if (this.event['description']['attendees'] !== undefined) {
        this.joined = this.event['description']['attendees'].includes(user.user_id);
      }
      if (this.event['description']['interested'] !== undefined) {
        this.interested = this.event['description']['interested'].includes(user.user_id);
      }
    });
  }

}
