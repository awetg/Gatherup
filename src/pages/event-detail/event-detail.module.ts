import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EventDetailPage } from './event-detail';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    EventDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(EventDetailPage),
    PipesModule
  ],
  exports: [
    EventDetailPage
  ]
})
export class EventDetailPageModule {}
