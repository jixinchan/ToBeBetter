import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MydynamicPage } from './mydynamic';

@NgModule({
  declarations: [
    MydynamicPage,
  ],
  imports: [
    IonicPageModule.forChild(MydynamicPage),
  ],
})
export class MydynamicPageModule {}
