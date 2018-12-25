import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the StartestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-startest',
  templateUrl: 'startest.html',
})
export class StartestPage {
  gotest(){
    this.navCtrl.push('BodytestPage',{'des':1}); 
  }
  skip(){
    this.navCtrl.pop();
  }

  constructor(public navCtrl: NavController, public navParams: NavParams,public app:App) {
  }
}
