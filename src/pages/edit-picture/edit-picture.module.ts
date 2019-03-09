import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditPicturePage } from './edit-picture';

@NgModule({
  declarations: [
    EditPicturePage,
  ],
  imports: [
    IonicPageModule.forChild(EditPicturePage),
  ],
})
export class EditPicturePageModule {}
