import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

declare var google;
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';
import {Popoverprovider} from '../../providers/popover';
import { ApiRequestProvider } from '../../providers/api-request/api-request';
/**
 * Generated class for the DeliverydetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deliverydetails',
  templateUrl: 'deliverydetails.html',
})
export class DeliverydetailsPage {

  items:any;itemsgotten:any;
  resquestor:any;
  reqlocation:any;
  reqtotal:any;guylongitude:any;
  guylatitude:any;
  actions:any;trcode:any;
  data:any;guyfullname:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, private alertCtrl: AlertController, public api:ApiRequestProvider, private geolocation : Geolocation) {

    this.itemsgotten = this.navParams.get('items');
    this.trcode = this.itemsgotten.trcode;
    this.resquestor = this.itemsgotten.truser;
    this.reqlocation = this.itemsgotten.trlocation;
    this.reqtotal = this.itemsgotten.trproductcost;
    this.items = this.itemsgotten.trcartdetails;

    this.items = JSON.parse(this.items);
    this.guyfullname = localStorage.getItem('FullName');
    console.log('Fullname here ', this.itemsgotten);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeliverydetailsPage');
  }

  initMap() {

    this.geolocation.getCurrentPosition().then((position) => {

     let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
     this.guylatitude = position.coords.latitude;
     this.guylongitude = position.coords.longitude;
    //  console.log("Your long and lat ",this.locationlat);
   }, (err) => {
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
            this.acceptrequest();
            
          }
        }
      ]
    });
    alert.present();
  }

  
  acceptrequest(){
    this.actions = "&actions=acceptrequest";
    this.data = "&guyfullname=" + this.guyfullname + "&trcode=" +this.trcode + "&guylongitude=" +this.guylongitude + "&guylatitude=" +this.guylatitude;
    this.api.postData(this.actions,this.data).then(res=>{
      let repo = JSON.parse(res['_body']);
      console.log(repo +' I have data!');
      
      this.navCtrl.push('MaplocPage',{
        items:this.itemsgotten
      });

    })
  }

  pagepop(){
    this.navCtrl.pop();
  }
  

}
