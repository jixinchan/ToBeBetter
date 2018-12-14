import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SharePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-share',
  templateUrl: 'share.html',
})
export class SharePage {
  close() {
    this.navCtrl.pop();
  }
  goTest(){
    this.navCtrl.push('BodytestPage');
  }
  flag=true;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.flag=this.navParams.get('flag');
  }
  ionViewDidLoad() {
    // console.log('ionViewDidLoad SharePage');
  }
}
