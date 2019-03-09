import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { PlaceItem } from '../../interface/event';

/**
 * Generated class for the PlaceAutocompletePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-place-autocomplete',
  templateUrl: 'place-autocomplete.html',
})
export class PlaceAutocompletePage {

  autocompleteInput = '';
  autocompleteItems: PlaceItem[] = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public zone: NgZone,
    public eventProvider: EventProvider,
    public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlaceAutocompletePage');
  }

  async updateSearchResults() {
    if (this.autocompleteInput === '') {
      this.autocompleteItems = [];
      return;
    }
    await this.eventProvider.getPlacePredictions(this.autocompleteInput)
    .then(predictions => {
      this.zone.run(() => this.autocompleteItems = predictions.features)
    })
    .catch(error => console.log(error));
  }

  selectSearchResult(item) {
    this.viewCtrl.dismiss(item).catch(error => console.log(error));
  }

  closeView() {
    this.viewCtrl.dismiss();
  }

}
