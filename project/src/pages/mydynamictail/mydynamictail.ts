import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

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
  dynamic;
  paragraph;
  user_info;
  input="";
  rTime;
  flag = false;
  love = false;
  star = false;

  change(i) {
    if (i == 0) {
      this.flag = !this.flag;
      this.http.post("/api/mydynamictail/attention", {
        "uid": this.uid,
        "aid": this.aid
      }).subscribe(data => { });
    } else {
      let alert = this.alertCtrl.create({
        message: '确认不在关注？',
        buttons: [
          {
            text: '确认',
            handler: () => {
              this.flag = !this.flag;
              this.http.post("/api/mydynamictail/noattention", {
                "uid": this.uid,
                "aid": this.aid
              }).subscribe(data => { });
            }
          },
          {
            text: '取消',
            handler: () => {

            }
          }
        ]
      });
      alert.present();
    }
  }

  change2() {
    this.love = !this.love;
  }

  change3(i) {
    this.star = !this.star;
    if (i == 0) {
      this.http.post("/api/mydynamictail/collection", {
        "uid": this.uid,
        "did": this.did,
      }).subscribe(data => { });
    } else {
      this.http.post("/api/mydynamictail/nocollec", {
        "uid": this.uid,
        "did": this.did,
      }).subscribe(data => { });
    }
  }

  goShare() {
    let profileModal = this.modalCtrl.create('SharePage');
    profileModal.present();
  }

  goAssess() {
    this.navCtrl.push('AssessPage',{"did":this.did});
    // console.log(this.did);
  }

  release() {
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
    if(this.input!=''){
      this.http.post('/api/mydynamictail/assess', {
        "did": this.did,
        "uid": this.uid,
        "time": this.rTime,
        "content": this.input
      }).subscribe(data=>{});
      this.goAssess();
    }
    this.input="";
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.did = this.navParams.get('did');
    this.uid = localStorage.getItem("uid");

    this.http.post('/api/mydynamictail',{'did':this.did}).subscribe(data=>{
      this.dynamic = data;
      this.dynamic.forEach(e => {
        e.imgs = '../assets/imgs/'+e.imgs;
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
