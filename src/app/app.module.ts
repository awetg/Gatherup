import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { MyApp } from './app.component';

import { AppConstantProvider } from '../providers/app-constant/app-constant';
import { MediaProvider } from '../providers/media/media';
import { AppDbProvider } from '../providers/app-db/app-db';
import { EventProvider } from '../providers/event/event';
import { AuthProvider } from '../providers/auth/auth';
import { SettingsProvider } from '../providers/settings/settings';
import { PipesModule } from '../pipes/pipes.module';
import { Camera } from '@ionic-native/camera/ngx';

@NgModule({
  declarations: [
    MyApp,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule,
    PipesModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    EventProvider,
    AuthProvider,
    AppConstantProvider,
    SettingsProvider,
    MediaProvider,
    AppDbProvider,
    Camera,
    ]
})
export class AppModule {}
