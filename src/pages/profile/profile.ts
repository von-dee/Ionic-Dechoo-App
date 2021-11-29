import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ApiRequestProvider } from '../../providers/api-request/api-request';
/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  fullname:any;userid:any;
  email:any;items:any;
  phonenumber:any;
  branchcode:any;
  PhotoUrl:any;
  userimagename:any;
  branchname:any;defaultphoto:any;
  actions:any;othername:any;surname:any;
  data:any;location:any;
  

  constructor(public navCtrl: NavController, public navParams: NavParams, public api:ApiRequestProvider) {
  
    this.fullname = localStorage.getItem('FullName');
    this.email = localStorage.getItem('Email');
    this.phonenumber = localStorage.getItem('PhoneNumber');
    this.branchcode = localStorage.getItem('BrachCode');
    this.branchname = localStorage.getItem('BranchName');
    this.PhotoUrl = localStorage.getItem('PhotoUrl')+'/profiles/';
    this.userimagename = this.PhotoUrl+localStorage.getItem('photo')
    this.userid = localStorage.getItem('UserID');
    this.defaultphoto = "img/avatar.png";
    if(this.userimagename == "" || this.userimagename == null){
      this.userimagename = "../assets/imgs/avatar.png";
    }

    var res = this.fullname.split(" ");
    this.othername = res[0];
    this.surname = res[1];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  
  saveuserinfo(){
    this.actions = "&actions=updateprofileinfo";
    this.data = "&userid="+this.userid+"&othername="+this.othername+"&surname="+this.surname+"&phonenumber="+this.phonenumber+"&email="+this.email;
    
    this.api.postData(this.actions,this.data).then(res=>{
      let repo = JSON.parse(res['_body']);
      console.log(repo +' I have data!');
      if(repo.msg == 'true'){
        this.items = Array(repo.data);
        this.saveinlocal();
        console.log(this.items);
      }else{
        this.api.errorToast('Network is slow');
      }

    })
  }

  saveinlocal(){
    this.fullname = this.othername + " " + this.surname;
    localStorage.setItem('Email',this.email);
    localStorage.setItem('FullName', this.fullname);
    localStorage.setItem('PhoneNumber',this.phonenumber);
  }


  pagepop(){
    this.navCtrl.pop();
  }
  

}
