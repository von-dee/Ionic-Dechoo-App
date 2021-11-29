import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { ApiRequestProvider } from '../../providers/api-request/api-request';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  pwd:any; uname:any; data:any;
  actions:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public api:ApiRequestProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }


  toMenuPage(){
    this.navCtrl.push('MenuPage');
  }
  
  loginUser(){
    this.api.pageLoading('Loggin in...');
    this.actions = "&actions=loginuser";
    this.data = "&usname="+this.uname+"&pwd="+this.pwd;
    this.api.initAccess(this.actions,this.data).then((res)=>{
      let repo = JSON.parse(res['_body']);
      if(repo.data == 'true'){
        console.log('Am Here!');
        localStorage.setItem('BranchCode',repo.branchcode);
        localStorage.setItem('PhotoUrl',repo.photourl);
        localStorage.setItem('BranchName',repo.branchname);
        localStorage.setItem('Email',repo.email);
        localStorage.setItem('FullName',repo.fullname);
        localStorage.setItem('Token',repo.key);
        localStorage.setItem('PhoneNumber',repo.phonenumber);
        localStorage.setItem('UserID',repo.userid);
        localStorage.setItem('photo',repo.photo);
        
        this.toMenuPage();
        this.api.dismissLoading();
      }
    })
  }


}
