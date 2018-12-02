import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
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
  constructor(public alertCtrl:AlertController,public http:HttpClient,public app:App,public navCtrl: NavController)
  {
  }
  tel;
  pwd;
  repwd;

  submit(){
    this.http.post('/api/register',{
      "tel":this.tel,
      "pwd":this.pwd
    }).subscribe(data=>{
      if(!data){
        this.presentPrompt('该手机号已注册，请登录。');
      }
    });
  }
  presentPrompt(str) {
    let alert = this.alertCtrl.create({
      title: '登录失败',
      subTitle:str+'，请重新输入。',
      buttons: [
        {
          text: '确认',
          role: 'cancel',
          handler: data => {
            console.log('Confirm clicked');
          }
        }
      ]
    });
    alert.present();
  }
}

