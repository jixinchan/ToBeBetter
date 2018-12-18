import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { QuickloginProvider } from '../../providers/quicklogin/quicklogin';

/**
 * Generated class for the MydynamictailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mydynamictail',
  templateUrl: 'mydynamictail.html',
})
export class MydynamictailPage {

  uid;
  aid;
  did;
  cid;
  assess;
  dynamic;
  paragraph;
  user_info;
  input="";
  rTime;
  flag = false;
  love = false;
  star = false;

  goShare() {
    if (this.uid == '1') {//游客判断
      this.quicklogin.quickLogin();
    } else {
      let profileModal = this.modalCtrl.create('SharePage',{flag:true});
      profileModal.present();
    }
  }
  goAssess() {
    if (this.uid == '1') {//游客判断
      this.quicklogin.quickLogin();
    } else {
      this.navCtrl.push('AssessPage', { "did": this.did });
    }
  }
  release() {//游客判断
    if (this.uid == '1') {
      this.quicklogin.quickLogin();
    } else {
      var mytime = new Date();
      var formatDateTime = function (date) {
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        return m + '-' + d + ' ' + h + ':' + minute;
      };
      this.rTime = formatDateTime(mytime);
      // console.log(this.rTime);
      if (this.input != '') {
        this.http.post('/api/contact/contactail/assess', {
          "did": this.did,
          "uid": this.uid,
          "time": this.rTime,
          "content": this.input
        }).subscribe(data => {
          this.assess = data;
          console.log(this.assess);
          this.goAssess();
        });
      }
      this.input = "";
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public modalCtrl: ModalController, public alertCtrl: AlertController,public quicklogin:QuickloginProvider) {
    this.did = this.navParams.get('did');
    this.uid = localStorage.getItem("uid");

    this.http.post('/api/mydynamictail',{'did':this.did}).subscribe(data=>{
      this.dynamic = data;
      this.dynamic.forEach(e => {
        e.imgs = '../assets/imgs/download/'+e.imgs;
      });
    });
    this.http.post('/api/mydynamictail/user_info',{'uid':this.uid}).subscribe(data=>{
      this.user_info = data;
      this.user_info.forEach(e => {
        e.avatar = '../assets/imgs/avatar/'+e.avatar;
      });
    });
    

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MydynamictailPage');
  }

}