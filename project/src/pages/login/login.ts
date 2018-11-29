import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,App} from 'ionic-angular';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { TabsPage } from '../tabs/tabs';
import { AlertController } from 'ionic-angular';

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

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  constructor(public alertCtrl:AlertController,public app:App,public http: HttpClient,public navCtrl: NavController, public navParams: NavParams) {
  }

  headers = new HttpHeaders( {'Content-Type':'application/x-www-form-urlencoded'} );
  login(){
    this.http.post('/api/login',{
      "tel":this.tel,
      "pwd":this.pwd
    },{headers:this.headers}).subscribe((data)=>{
      // 1成功 0密码空 -1用户不存在 -2密码错误 -3手机号空
      switch(data){
        case 0:
            this.presentPrompt('密码不能为空');
            break;
        case 1:
            this.goHome();
            break;
        case -1:
            this.presentPrompt('该手机号未注册');
            break;
        case -2:
            this.presentPrompt('密码错误');
            break;
      }
    });
  }
  goHome(){
    //跳转到tabs页并将用户tel传给tabs
    this.app.getRootNavs()[0].setRoot(TabsPage,{account:this.tel});
  }
  goRegister(){
    this.navCtrl.push('RegisterPage');
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
