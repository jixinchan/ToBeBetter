import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{ SettingsPage} from '../settings/settings'

/**
 * Generated class for the MePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-me',
  templateUrl: 'me.html',
})
export class MePage {

  goSet(){
    this.navCtrl.push('SettingsPage');
  }
  goPrivate(){
    this.navCtrl.push('UsertailPage')
  }
  goMydynamic(){
    this.navCtrl.push('MydynamicPage');
  }
  goMyattention(){
    this.navCtrl.push('MyattentionPage')
  }
  goMyfans(){
    this.navCtrl.push('MyfansPage');
  }
  goMylikes(){
    this.navCtrl.push('MylikesPage')
  }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MePage');
  }

}
