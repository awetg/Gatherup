import { NgModule } from '@angular/core';
import { EventCardComponent } from './event-card/event-card';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../pipes/pipes.module';
import { EventDetailPageModule } from '../pages/event-detail/event-detail.module';

@NgModule({
  declarations: [
    EventCardComponent,
  ],
  imports: [
    IonicModule,
    PipesModule,
    EventDetailPageModule
  ],
  exports: [
    EventCardComponent,
  ]
})
export class ComponentsModule {}
