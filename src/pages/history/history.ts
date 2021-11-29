import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiRequestProvider } from '../../providers/api-request/api-request';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  actions:any; data:any; clustercode:any; items:any; usercode:any; currency: string="₵";

  constructor(public navCtrl: NavController, public navParams: NavParams, public api:ApiRequestProvider) {
    this.usercode = localStorage.getItem('UserID');
    this.clustercode = localStorage.getItem('BranchCode');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PurchaseHistoryPage');
  }
  ionViewWillEnter(){
    this.loadData();
  }

  loadData(){
    this.actions = "&actions=purchasehistoryuser";
    this.data = "&clustercode="+this.clustercode+'&transusercode='+this.usercode;
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

  pagepop(){
    this.navCtrl.pop();
  }

}
