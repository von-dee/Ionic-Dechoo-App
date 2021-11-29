import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MaplocPage } from './maploc';

@NgModule({
  declarations: [
    MaplocPage,
  ],
  imports: [
    IonicPageModule.forChild(MaplocPage),
  ],
})
export class MaplocPageModule {}
