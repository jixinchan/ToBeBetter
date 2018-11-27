import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,App} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  tel;
  pwd;

  goHome(){
    this.app.getRootNavs()[0].setRoot(TabsPage);
  }

  goRegister(){
    this.navCtrl.push(RegisterPage);
  }
  constructor(public app:App,public http: HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
    this.http.post('192.168.137.144:8080',{
      "tel":this.tel,
      "pwd":this.pwd
    });
  }
}
