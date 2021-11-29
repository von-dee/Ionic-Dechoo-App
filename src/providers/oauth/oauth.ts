import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the OauthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class OauthProvider {
  action:any;
  data:any;

  constructor(public http: Http) {
    console.log('Hello OauthProvider Provider');
  }

  oauthUser(){ 
    let token=localStorage.getItem('Token');
    return new Promise((resolve) => { 
      setTimeout(()=>{
   
      if (token){
          resolve(true)
      }else{
          resolve(false);
      }
   
      },1000)
   });
  }

}


