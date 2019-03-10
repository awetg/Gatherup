import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileContextMenuPage } from './profile-context-menu';

@NgModule({
  declarations: [
    ProfileContextMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileContextMenuPage),
  ],
})
export class ProfileContextMenuPageModule {}
