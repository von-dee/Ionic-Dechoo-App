import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


/**
 * Generated class for the Popover page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class Popover {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Popover');
  }

  close(){
    this.viewCtrl.dismiss();
  }

  toLoginPage(){
    localStorage.removeItem('BranchCode');
    localStorage.removeItem('BranchName');
    localStorage.removeItem('Email');
    localStorage.removeItem('FullName');
    localStorage.removeItem('PhoneNumber');
    localStorage.removeItem('PhotoUrl');
    localStorage.removeItem('Token');
    localStorage.removeItem('UserID');
    localStorage.removeItem('photo');    
    this.navCtrl.push('HomePage');
    this.close()

  }

  toNotificationPage(){
    this.navCtrl.push('NotificationPage');
    this.close()
  }

  toProfilePage(){
    this.navCtrl.push('ProfilePage');
    this.close()
  }

  toHistoryPage(){
    this.navCtrl.push('HistoryPage');
    this.close()
  }

  



}
