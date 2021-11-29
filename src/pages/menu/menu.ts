import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import {Popoverprovider} from '../../providers/popover';
import { ApiRequestProvider } from '../../providers/api-request/api-request';
/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  guyfullname: any;guyid: any;
  firstname:any;isToggled:any;
  actions:any; data:any; clustercode:any; items:any; usercode:any; currency: string="₵";

  
  constructor(public navCtrl: NavController, public navParams: NavParams, public pop: Popoverprovider, public api:ApiRequestProvider, private alertCtrl: AlertController) {
    this.guyfullname = localStorage.getItem('FullName');
    this.guyid = localStorage.getItem('UserID');
    var nameArray = this.guyfullname .split(' ');
    this.firstname = nameArray[0];

    this.isToggled = false;
  }

  ionViewWillEnter(){
    this.loadRequests();
  }

  public changestatus() {
    console.log("Toggled to change: "+ this.isToggled); 
    this.changestatus_on_api();
  }
  

  changestatus_on_api(){

    // if(this.isToggled == true){
    // }else{
    // }

    this.actions = "&actions=updatestatus";
    this.data = "&status_type=" + this.isToggled + "&deliveryguy_id=" +  this.guyid;

    this.api.postData(this.actions,this.data).then(res=>{
      let repo = JSON.parse(res['_body']);
    }).catch(err=>{
      console.log(err);
    });

  }

  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: 'Confirm purchase',
      message: 'Do you want to buy?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Accept',
          handler: () => {
            console.log('Accept clicked');
            
          }
        }
      ]
    });
    alert.present();
  }


  
  loadRequests(){
    this.actions = "&actions=requestsfetch";
    this.data = "";
    this.api.postData(this.actions,this.data).then(res=>{
      let repo = JSON.parse(res['_body']);
      console.log(repo +' I have data!');
      if(repo.msg == 'true'){
        this.items = repo.data;
      }else if(repo.msg == 'no-data-in-transaction-table'){
        this.items=0;
      }else{
        this.api.errorToast('Network is slow');
      }
    })
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  toRequestPage(items){
    this.navCtrl.push('DeliverydetailsPage',{
      items:items
    });
  }

  toMaplocPage(){
    this.navCtrl.push('MaplocPage');
  }

  toHistoryPage(){
    this.navCtrl.push('HistoryPage');
  }

  presentPopover(event){
    this.pop.navPopover(event);
  }
  

}
