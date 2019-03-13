import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { FirstRunPage, MainPage } from '../pages';
import { AuthProvider } from '../providers/auth/auth';
import { AppDbProvider } from '../providers/app-db/app-db';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = FirstRunPage;
  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private authProvider: AuthProvider,
    private appDB: AppDbProvider) {
      /* Set root page depending on whether user is logged in or not */
    this.authProvider.isAuthecticated().subscribe(
      authenticated => {
        this.rootPage = authenticated ? MainPage : FirstRunPage;
      }
    );
    /* download the a media file that act as database for the App */
    this.appDB.loadAppDB();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    }).catch(error => console.log(error));
  }
}

