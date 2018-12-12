import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App, ModalController} from 'ionic-angular';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
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
  uid;
  headers = new HttpHeaders( {'Content-Type':'application/x-www-form-urlencoded'} );
  goLogin(){
    this.app.getRootNavs()[0].setRoot('LoginPage');
    localStorage.removeItem('uid');
    localStorage.removeItem(this.uid+'history');
    this.http.post('/api/login/statusout',{'uid':this.uid},{headers:this.headers}).subscribe(data=>{});
  }
  constructor(public http:HttpClient  ,public app:App, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {

  }

  ionViewDidLoad() {
    this.uid = localStorage.getItem('uid');
    console.log('ionViewDidLoad SettingsPage');
  }
  goShare() {
    let profileModal = this.modalCtrl.create('SharePage');
    profileModal.present();
  }
}
