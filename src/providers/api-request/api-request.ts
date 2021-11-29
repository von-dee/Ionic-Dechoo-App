import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/retryWhen';


@Injectable()
export class ApiRequestProvider {
  initApi:string = "apikey=rL%N8f_4RYT+9m5tMKMv";
  // server:string = "http://192.168.15.99/thechoo.api/index.php";

  server:string = "http://localhost/thechoo.api/index.php";

  apiKey:any = "apikey="+localStorage.getItem('Token');
  loader:any;

  constructor(public http: Http, public toastCtr:ToastController, public loadingCtrl:LoadingController) {
    console.log('Hello ApiProvider Provider');
    var url_photo= "http://localhost/thechoo.api/media/uploads";
    localStorage.setItem('PhotoUrl',url_photo);
  }

  initAccess(action,data){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new Promise((resolve)=>{
    this.http.post(this.server,this.initApi+action+data,{headers:headers}).retryWhen(error=>error.delay(500)).subscribe(res=>{
      resolve(res)
    },err=>{
      console.log(err);
      this.syserrorToast(err).then((err)=>{
        if(err){
          this.initAccess(action,data);
        }
      });
    })
  });
  }

  getData(action){
    return new Promise((resolve)=>{
    this.http.get(this.server+this.apiKey+action).retryWhen(error=>error.delay(500)).subscribe(res=>{
      resolve(res)
    },err=>{
      this.syserrorToast(err).then((err)=>{
        if(err){
          this.getData(action);
        }
      });
    })
  });
  }

  postData(action,data){
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return new Promise((resolve)=>{
    this.http.post(this.server,this.apiKey+action+data,{headers:headers}).retryWhen(error=>error.delay(500)).subscribe(res=>{
      resolve(res)
    },err=>{
      this.syserrorToast(err).then((err)=>{
        if(err){
          this.postData(action,data);
        }
      });
    })
  });
  }

  syserrorToast(message, position='top'){
    return new Promise((resolve,reject)=>{
    let toast = this.toastCtr.create({
      message:message,
      position:position,
      duration: 4000,
      cssClass:'connecterror'
    });
    toast.present();
  });
  }

  successToast(message, position='bottom'){
    let toast = this.toastCtr.create({
      message:message,
      position:position,
      duration: 4000,
      cssClass: 'successtoast'
    });
    toast.present();
  }

  errorToast(message, position='top'){
    let toast = this.toastCtr.create({
      message:message,
      position:position,
      duration: 4000,
      cssClass: 'errortoast'
    });
    toast.present();
  }

infoToast(message, position='top'){
    let toast = this.toastCtr.create({
      message:message,
      position:position,
      showCloseButton: true,
      closeButtonText: 'Ok',
      cssClass: 'infotoast'
    });
    toast.present();
  }

  pageLoading(msg) {
    this.loader = this.loadingCtrl.create({
      content: msg
    });
    this.loader.present();
  }
  

  dismissLoading(){
    this.loader.dismiss();
  }
}
