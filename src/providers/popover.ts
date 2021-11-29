import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { PopoverController } from 'ionic-angular';
import { Popover } from '../pages/popover/popover';

/*
  Generated class for the Popover provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class Popoverprovider {

  constructor(public http: Http, public popoverCtrl: PopoverController) {
    console.log('Hello Popover Provider');
  }

  navPopover(myEvent) {
    let popover = this.popoverCtrl.create(Popover, {}, {cssClass: 'navigation-popover'});
    popover.present({
      ev:myEvent
    });
  }

}
