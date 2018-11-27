import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the HometailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hometail',
  templateUrl: 'hometail.html',
})
export class HometailPage {

  newLeave:any={};
  Share(){

  }
  //收藏的功能
  isActive=1;
  Collection(i){
    this.isActive=i;
  }
  arr=[0];
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController) {
    this.newLeave.sqsj=new Date(new Date().getTime()+8*60*60*1000).toISOString();//北京时间
  }
//分享的功能
  doPrompt() {
    let alert = this.alertCtrl.create({
      title: '分享给朋友',
      message: '&nbsp;<img src="../assets/imgs/wechat.png" width="50px" style="margin-right:20px"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../assets/imgs/QQ.png" width="50px"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../assets/imgs/微博.png" width="50px"/>',
      buttons: ['取消']
    });
    alert.present()
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HometailPage');
  }

}
