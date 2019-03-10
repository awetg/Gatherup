import { Component, Input } from '@angular/core';
import { EventProvider } from '../../providers/event/event';
import { NavController } from 'ionic-angular';

/**
 * Generated class for the EventCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'event-card',
  templateUrl: 'event-card.html'
})
export class EventCardComponent {

  @Input() events: Event[];

  constructor(public navCtrl: NavController, public event: EventProvider) {
    console.log('Hello EventCardComponent Component');
  }

  parse(data: string) {
    return JSON.parse(data);
  }

  /**
   * Navigate to the detail page for this event.
   */
  openEvent(event) {
    console.log('Event Card clicked');
    this.navCtrl.push('EventDetailPage', {
      event
    }).catch(error => console.log(error));
  }

}
