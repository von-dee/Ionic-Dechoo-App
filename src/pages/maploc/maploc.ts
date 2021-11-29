import { Component , ViewChild ,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation ,GeolocationOptions ,Geoposition ,PositionError } from '@ionic-native/geolocation';

import { CallNumber } from '@ionic-native/call-number';

declare var google;

/**
 * Generated class for the MaplocPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-maploc',
  templateUrl: 'maploc.html',
})
export class MaplocPage {

  options : GeolocationOptions;
  currentPos : Geoposition;
  @ViewChild('map') mapElement: ElementRef;
  map: any;

  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;

  mylat: any;  mylong: any; items: any; page_from: any;  pharm_name: any; pharm_location: any; pharm_longitude: any;
  pharm_phone: any; pharm_latitude: any; pharm_drugname: any; pharm_drugdescription: any; latLngme:any; latme :any; longme :any;
  resquestor: any;reqlocation: any;reqtotal: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation : Geolocation, private callNumber: CallNumber) {
    this.items = this.navParams.get('items');

    this.resquestor = this.items.truser;
    this.reqlocation = this.items.trlocation;
    this.pharm_latitude = this.items.trlocationlat;
    this.pharm_longitude = this.items.trlocationlong;
    this.reqtotal = this.items.trproductcost;
    this.items = this.items.trcartdetails;
    this.items = JSON.parse(this.items);
    console.log('The items dis ',this.items);
  }


  ionViewDidLoad(){
    this.initMap();
  }


  initMap() {

    this.geolocation.getCurrentPosition().then((position) => {

     let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
     this.latme = position.coords.latitude;
     this.longme = position.coords.longitude;

     let mapOptions = {
       center: latLng,
       zoom: 15
     }


     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
     this.directionsDisplay.setMap(this.map);
     this.calculateAndDisplayRoute();

   }, (err) => {
     console.log(err);
   });


  }

  calculateAndDisplayRoute() {

    var start = this.latme + ',' + this.longme;
    var end =  this.pharm_latitude + ',' + this.pharm_longitude;

    // var start = '5.300622800000001,-1.9992394';
    // var end = '5.300535, -1.993902';
    console.log(end);


    this.directionsService.route({
      origin: start,
      destination: end,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        this.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


  pagepop(){
    this.navCtrl.push('MenuPage');
  }

  callPharmacy(){
    this.callNumber.callNumber("0501118019", false)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

}
