import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlaceAutocompletePage } from './place-autocomplete';

@NgModule({
  declarations: [
    PlaceAutocompletePage,
  ],
  imports: [
    IonicPageModule.forChild(PlaceAutocompletePage),
  ],
})
export class PlaceAutocompletePageModule {}
