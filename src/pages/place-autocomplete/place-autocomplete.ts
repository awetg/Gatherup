import { Component, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { PlaceItem } from '../../interface/event';
import { AppDbProvider } from '../../providers/app-db/app-db';

/**
 *
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
    public appProvider: AppDbProvider,
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
    await this.appProvider.getPlacePredictions(this.autocompleteInput)
    .then(predictions => {
      this.zone.run(() => this.autocompleteItems = predictions.features);
    })
    .catch(error => console.log(error));
  }

  selectSearchResult(item) {
    this.viewCtrl.dismiss(item).catch(error => console.log(error));
  }

  closeView() {
    this.viewCtrl.dismiss().catch(error => console.log(error));
  }

}
