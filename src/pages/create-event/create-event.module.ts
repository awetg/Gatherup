import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateEventPage } from './create-event';
import { PlaceAutocompletePageModule } from '../place-autocomplete/place-autocomplete.module';

@NgModule({
  declarations: [
    CreateEventPage,
  ],
  imports: [
    IonicPageModule.forChild(CreateEventPage),
    PlaceAutocompletePageModule
  ],
})
export class CreateEventPageModule {}
