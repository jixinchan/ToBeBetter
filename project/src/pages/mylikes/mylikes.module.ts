import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MylikesPage } from './mylikes';

@NgModule({
  declarations: [
    MylikesPage,
  ],
  imports: [
    IonicPageModule.forChild(MylikesPage),
  ],
})
export class MylikesPageModule {}
