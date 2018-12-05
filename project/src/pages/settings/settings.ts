import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App, ModalController} from 'ionic-angular';
// import{ LoginPage} from '../login/login'

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  goLogin(){
    this.app.getRootNavs()[0].setRoot('LoginPage');
    localStorage.removeItem('uid');
  }
  constructor(public app:App, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  goShare() {
    let profileModal = this.modalCtrl.create('SharePage');
    profileModal.present();
  }
}
