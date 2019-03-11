import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MediaProvider } from '../../providers/media/media';
import { Comment } from '../../interface/media';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public mediaProvider: MediaProvider) {
    this.event = navParams.get('event');
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

}
