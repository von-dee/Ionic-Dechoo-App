import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { CallNumber } from '@ionic-native/call-number';
import { HttpModule } from "@angular/http";
import { Popoverprovider } from '../providers/popover';
import { Popover } from '../pages/popover/popover';
import { IonicStorageModule } from '@ionic/storage';
import { MyApp } from './app.component';

import { ApiRequestProvider } from '../providers/api-request/api-request';
import { OauthProvider } from '../providers/oauth/oauth';

@NgModule({
  declarations: [
    MyApp,
    Popover
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Popover
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    CallNumber,
    Popoverprovider,
    ApiRequestProvider,
    OauthProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
