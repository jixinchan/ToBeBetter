import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UsertailPage } from './usertail';
import { MultiPickerModule } from 'ion-multi-picker';

@NgModule({
  declarations: [
    UsertailPage,
  ],
  imports: [
    IonicPageModule.forChild(UsertailPage),
    MultiPickerModule
  ],
})
export class UsertailPageModule {}
