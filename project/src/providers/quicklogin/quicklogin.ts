import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, App } from 'ionic-angular';

/*
  Generated class for the QuickloginProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QuickloginProvider {
  quickLogin(){
    let quickLogin = this.alertCtrl.create({
      message: '确认重新登录吗？',
      buttons: [
        {
          text: '确认',
          handler: () => {
            this.app.getRootNavs()[0].setRoot('LoginPage');
          }
        },
        {
          text: '取消',
          handler: () => { }
        }
      ]
    });
    quickLogin.present();
  }

  constructor(public http: HttpClient,public alertCtrl: AlertController,public app:App) {
   
  }
}
