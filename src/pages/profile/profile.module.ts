import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import { ComponentsModule } from '../../components/components.module';
import { EditProfilePageModule } from '../edit-profile/edit-profile.module';
import { ProfileContextMenuPageModule } from '../profile-context-menu/profile-context-menu.module';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    ComponentsModule,
    EditProfilePageModule,
    ProfileContextMenuPageModule,
    PipesModule
  ],
})
export class ProfilePageModule {}
