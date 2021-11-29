import { Component,ViewChild } from '@angular/core';
import { App, Platform, Nav, ViewController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { OauthProvider } from '../providers/oauth/oauth';
import { ApiRequestProvider } from '../providers/api-request/api-request';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  @ViewChild(ViewController) viewCtrl: ViewController;
  rootPage:any = 'HomePage';
  loader: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,public oauth:OauthProvider, public api:ApiRequestProvider, public app:App, public alertCtrl: AlertController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit(){
    this.oauth.oauthUser().then((isLoggedIn) =>{
      if(isLoggedIn){
        this.nav.setRoot('MenuPage');
      }else{
        this.rootPage = 'HomePage';
      }
    });
  }

}

