import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { QuickloginProvider } from '../../providers/quicklogin/quicklogin';

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
  avatar;//头像
  nickname;//昵称
  signature;//个签
  uid;//用户id
  constructor(public quicklogin:QuickloginProvider ,public http:HttpClient, public navCtrl: NavController, public navParams: NavParams) {
  }
  headers = new HttpHeaders( {'Content-Type':'application/x-www-form-urlencoded'} );
  ionViewDidLoad() {
    this.uid = localStorage.getItem('uid');
    this.http.post('/api/me',{'uid':this.uid},{headers:this.headers}).subscribe(data=>{
      this.avatar = './assets/imgs/avatar/'+data[0].avatar;
      this.nickname = data[0].nickname;
      this.signature = data[0].signature;
    });
  }

  goPage(page){
    if(this.uid=='1'){
      this.quicklogin.quickLogin();
    }else{
      this.navCtrl.push(page);
    }
  }
  goSet(){
    this.navCtrl.push('SettingsPage');
  }
}
