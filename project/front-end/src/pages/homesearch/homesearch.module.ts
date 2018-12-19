import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomesearchPage } from './homesearch';

@NgModule({
  declarations: [
    HomesearchPage,
  ],
  imports: [
    IonicPageModule.forChild(HomesearchPage),
  ],
})
export class HomesearchPageModule {}
