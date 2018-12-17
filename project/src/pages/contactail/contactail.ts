import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { QuickloginProvider } from '../../providers/quicklogin/quicklogin';

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
  myAvatar;//用户头像
  info;
  input = "";
  rTime;
  uid = localStorage.getItem("uid");
  aid;
  cid;
  did;
  flag = false;
  love = false;
  star = false;
  isAtten = [];
  isCollec = [];
  change(i) {
    if (this.uid == '1') { //游客判断
      this.quicklogin.quickLogin();
    } else {
      if (i == 0) {
        this.flag = !this.flag;
        this.http.post("/api/contact/contactail/attention", {
          "uid": this.uid,
          "aid": this.aid
        }).subscribe(data => { });
      } else {
        let alertAtten = this.alertCtrl.create({
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
              handler: () => { }
            }
          ]
        });
        alertAtten.present();
      }
    }
  }
  change2() {
    if (this.uid == '1') {//游客判断
      this.quicklogin.quickLogin();
    } else {
      this.love = !this.love;
    }
  }
  change3(i) {
    if (this.uid == '1') {//游客判断
      this.quicklogin.quickLogin();
    } else {
      this.star = !this.star;
      if (i == 0) {
        this.http.post("/api/contact/contactail/collection", {
          "uid": this.uid,
          "did": this.did
        }).subscribe(data => { });
      } else {
        this.http.post("/api/contact/contactail/nocollec", {
          "uid": this.uid,
          "did": this.did
        }).subscribe(data => { });
      }
    }
  }
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
          
        });
        this.goAssess();
      }
      this.input = "";
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: HttpClient, public modalCtrl: ModalController, 
    public alertCtrl: AlertController,public quicklogin:QuickloginProvider) {
    //传参
    this.i = this.navParams.get("index");
    this.nickname = this.navParams.get("nickname");
    this.avatar = this.navParams.get("avatar");

    //动态信息
    this.http.get("/api/contact").subscribe(data => {
      this.data = data;
      // console.log(data);
      if (this.data != undefined) {
        this.data.forEach(e => {
          this.imgs.push("../assets/imgs/download/" + e.imgs);
          this.title.push(e.title);
          this.content.push(e.content);
          this.uids.push(e.uid);
          this.dids.push(e.did);
          this.cids.push(e.cid);
          this.times.push(e.time);
        });
      }
      // console.log(this.title,this.imgs,this.content,this.uids,this.dids,this.cids,this.times);
      this.aid = this.uids[this.i];
      this.did = this.dids[this.i];
      this.cid = this.cids[this.i];
      // console.log(this.aid, this.did, this.cid);
      if (this.uid) {
        if (this.aid) {
          //是否关注
          this.http.post("/api/contact/contactail/isAtten", {
            "uid": this.uid,
            "aid": this.aid
          }).subscribe(data => {
            // console.log(data);
            this.isAtten.push(data);
            // console.log(this.isAtten);
            if (!!this.isAtten.join("")) {
              this.flag = true;
            } else {
              this.flag = false;
            }
          });
        }
        if (this.did) {
          //是否收藏
          this.http.post("/api/contact/contactail/isCollec", {
            "uid": this.uid,
            "did": this.did
          }).subscribe(data => {
            // console.log(data);
            this.isCollec.push(data);
            // console.log(this.isCollec);
            if (!!this.isCollec.join("")) {
              this.star = true;
            } else {
              this.star = false;
            }
          });
        }
      }
    });

    //动态分类
    this.http.get("/api/contact/contactail").subscribe(data => {
      this.class = data;
      // console.log(data);
      if (this.data != undefined) {
        this.data.forEach(e => {
          if (this.class != undefined) {
            this.class.forEach(c => {
              if (e.cid == c.cid) {
                this.className.push(c.className);
              }
            });
          }
        });
      }
      // console.log(this.className);
    });


    //用户信息
    this.http.get("/api/contact/user_info").subscribe(data => {
      this.info = data;
      // console.log(data);
      if (this.info != undefined && this.uid != undefined) {
        this.info.forEach(e => {
          if (e.uid == this.uid) {
            this.myAvatar = "../assets/imgs/avatar/" + e.avatar;
            // console.log(this.myAvatar);
          }
        });
      }
    });
  }
}
