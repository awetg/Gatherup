import { NgModule } from '@angular/core';
import { EventCardComponent } from './event-card/event-card';
import { IonicModule } from 'ionic-angular';
@NgModule({
  declarations: [
    EventCardComponent
  ],
  imports: [
    IonicModule,
  ],
  exports: [EventCardComponent]
})
export class ComponentsModule {}
