import { NgModule } from '@angular/core';
import { EventCardComponent } from './event-card/event-card';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
  declarations: [
    EventCardComponent,
  ],
  imports: [
    IonicModule,
    PipesModule
  ],
  exports: [
    EventCardComponent,
  ]
})
export class ComponentsModule {}
