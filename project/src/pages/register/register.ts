import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';

import { HttpClient} from '@angular/common/http';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  goLogin(){
    this.app.getRootNavs()[0].setRoot('LoginPage');
  }
  constructor(public http:HttpClient,public app:App,public navCtrl: NavController, public navParams: NavParams)
  {
  }
  tel;
  pwd;
  repwd;

  submit(){//10.7.86.67 192.168.0.109
    this.http.post('http://10.7.86.67:8080/register',{
      "tel":this.tel,
      "pwd":this.pwd
    }).subscribe(data=>{
      
    });
  }
}

