import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,App, ModalController} from 'ionic-angular';
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
  result;
  uid;

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');
  }

  constructor(public alertCtrl:AlertController,public app:App,public http: HttpClient,
    public navCtrl: NavController, public navParams: NavParams,
    public modal: ModalController
    ) {
  }

  headers = new HttpHeaders( {'Content-Type':'application/x-www-form-urlencoded'} );
  login(){
    if(!this.tel){
      this.presentPrompt('手机号不能为空');
    }else if(!this.pwd){
      this.presentPrompt('密码不能为空');
    }else{
      this.http.post('/api/login',{
        'tel':this.tel,
      },{headers:this.headers}).subscribe((data)=>{
        // console.log(data);
        if(!data[0]){
          this.presentPrompt('该手机号未注册');
        }else{
          if(data[0].password==this.pwd){
              //登陆成功
              this.uid = data[0].uid;
              localStorage.setItem('uid',data[0].uid);
              this.goHome();
          }else{
              this.presentPrompt('密码错误');
          }
        }
      });
    }
  }
  goHome(){
    this.http.post('/api/login/count',{'uid':this.uid},{headers:this.headers}).subscribe(data=>{
      if(!data){
        let profileModal = this.modal.create('StartestPage');
        profileModal.present();
      }
    });
    this.app.getRootNavs()[0].setRoot(TabsPage);
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

  //游客
  goHome2(){
    this.app.getRootNavs()[0].setRoot(TabsPage);
    localStorage.setItem("uid",'1');
    // localStorage.setItem("bid",'1');
  }
}
