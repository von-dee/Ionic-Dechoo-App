import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuPage } from './menu';

import { SearchPipe } from '../../pipes/search/search';
import { SortPipe } from '../../pipes/sort/sort';

@NgModule({
  declarations: [
    MenuPage,
    SearchPipe,
    SortPipe
  ],
  imports: [
    IonicPageModule.forChild(MenuPage),
  ],
})
export class MenuPageModule {}
