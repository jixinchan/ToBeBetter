import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ContactailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-contactail',
  templateUrl: 'contactail.html',
})
export class ContactailPage {
  i;
  data;//动态
  class;//类名
  title = [];//标题
  content = [];//内容
  imgs = [];//图片
  className = [];//分类
  uids = [];//用户uid
  dids = [];//动态did
  cids = [];//cid
  times = [];//发布时间
  nickname;//昵称
  avatar;//头像
  input="";
  rTime;
  uid = localStorage.getItem("uid");
  aid;
  cid;
  did;
  flag = false;
  love = false;
  star = false;
  change(i) {
    if (i == 0) {
      this.flag = !this.flag;
      this.http.post("/api/contact/contactail/attention", {
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
              this.http.post("/api/contact/contactail/noattention", {
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
      this.http.post("/api/contact/contactail/collection", {
        "uid": this.uid,
        "did": this.did,
        "cid": this.cid
      }).subscribe(data => { });
    } else {
      this.http.post("/api/contact/contactail/nocollec", {
        "uid": this.uid,
        "did": this.did,
        "cid": this.cid
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
      this.http.post('/api/contact/contactail/assess', {
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
    this.i = this.navParams.get("index");
    this.nickname = this.navParams.get("nickname");
    this.avatar = this.navParams.get("avatar");

    // console.log(this.uid);    
    this.http.get("/api/contact").subscribe(data => {
      this.data = data;
      // console.log(data);
      this.data.forEach(e => {
        this.imgs.push("../assets/imgs/" + e.imgs);
        this.title.push(e.title);
        this.content.push(e.content);
        this.uids.push(e.uid);
        this.dids.push(e.did);
        this.cids.push(e.cid);
        this.times.push(e.time);
      });
      // console.log(this.title,this.imgs,this.content,this.uids,this.dids,this.cids,this.times);
      this.aid = this.uids[this.i];
      this.did = this.dids[this.i];
      this.cid = this.cids[this.i];
      // console.log(this.aid,this.did,this.cid);
    });

    this.http.get("/api/contact/contactail").subscribe(data => {
      this.class = data;
      // console.log(data);
      this.data.forEach(e => {
        this.class.forEach(c => {
          if (e.cid == c.cid) {
            this.className.push(c.className);
          }
        });
      });
      // console.log(this.className);
    });
  }
  ionViewDidLoad() {
    
  }
}
