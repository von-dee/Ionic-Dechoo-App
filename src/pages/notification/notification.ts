import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiRequestProvider } from '../../providers/api-request/api-request';
/**
 * Generated class for the NotificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  actions:any; data:any; items:any; clustercode:any; userid:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api:ApiRequestProvider) {
    this.clustercode = localStorage.getItem('BranchCode');
    this.userid = localStorage.getItem('UserID');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  ionViewDidEnter(){
    this.loadData();
  }

  loadData(){
    this.actions = "&actions=fetchnotification";
    this.data = "&userid="+this.userid;
    this.api.postData(this.actions,this.data).then(res=>{
      let repo = JSON.parse(res['_body']);
      console.log(repo +' I have data!');
      if(repo.msg == 'true'){
        this.items = Array(repo.data);
        console.log(this.items);
      }else{
        this.api.errorToast('Network is slow');
      }
    })
  }

  notificationUpdate(){
    this.actions = "&actions=updatenotification";
    this.data = "&notclustercode="+this.clustercode+"&receiverid="+this.userid;
    this.api.postData(this.actions,this.data).then(res=>{
      let repo = JSON.parse(res['_body']);
      console.log(repo +' -> I have data!');
      if(repo.msg == "success"){
        this.loadData();
      }else{
        this.api.errorToast('Network is slow');
      }
    })
  }

  pagepop(){
    this.navCtrl.pop();
  }

}
