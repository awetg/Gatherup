import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DotmenuPage } from './dotmenu';

@NgModule({
  declarations: [
    DotmenuPage,
  ],
  imports: [
    IonicPageModule.forChild(DotmenuPage),
  ],
})
export class DotmenuPageModule {}
