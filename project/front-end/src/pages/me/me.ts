import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
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
  constructor(public quicklogin:QuickloginProvider ,public http:HttpClient, 
    public navCtrl: NavController, public navParams: NavParams,
    public events:Events ) {
    this.uid = localStorage.getItem('uid');
  }
  // headers = new HttpHeaders( {'Content-Type':'application/x-www-form-urlencoded'} );
  ionViewDidLoad() {  
    this.events.subscribe('MePage',()=>{
      this.ionViewWillEnter();
    });
  }
  ionViewWillEnter(){
    this.http.post('/api/me',{
      'uid':this.uid
    }).subscribe(data=>{
      let name=data[0].avatar;
      this.nickname = data[0].nickname;
      this.signature = data[0].signature;
      this.http.get('/api/imgs/avatar',{params:{name:name}}).subscribe(data=>{
        this.avatar='data:image/jpeg;base64,'+data['name'];
      })
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
