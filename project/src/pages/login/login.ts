import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,App, Header} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { TabsPage } from '../tabs/tabs';
import { RequestOptions, Headers } from '@angular/http';
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
    this.navCtrl.push('RegisterPage');
  }
  constructor(public app:App,public http: HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  login(){
    console.log(this.tel,this.pwd);
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin':'*'
    };
    let options ={
      headers: headers
    };
    this.http.post('http://192.168.1.104:8080',{
      "tel":this.tel,
      "pwd":this.pwd
    },options).subscribe((data)=>{});
  }
}
