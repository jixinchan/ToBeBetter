import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { QuickloginProvider } from '../../providers/quicklogin/quicklogin';
import { Events } from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  content;
  love = [10, 23, 17, 19, 11, 12];
  user_info;
  nickname = [];
  avatar = [];
  uid;//游客
  items;
  doRefresh(refresher) {
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
  goContactail(i) {
    this.navCtrl.push('ContactailPage', { index: i, nickname: this.nickname, avatar: this.avatar });
    // console.log(i);
  }
  goRelease() {
    if (this.uid == 1) {
      this.quicklogin.quickLogin();
    } else {
      this.navCtrl.push('ReleasePage');
    }
  }
  goSearch() {
    this.navCtrl.push('HomesearchPage');
  }

  constructor(
    public navCtrl: NavController,
    public http: HttpClient,
    public quicklogin: QuickloginProvider,
    public events: Events) {
    //游客
    this.uid = localStorage.getItem("uid");
  }
  ionViewDidEnter() {
    this.http.get("/api/contact").subscribe(data => {
      this.content = data;
      // console.log(data);
      if (this.content != undefined) {
        this.content.forEach(e => {
          e.imgs = "../assets/imgs/download/" + e.imgs;
        });
      }
    });

    this.http.get("/api/contact/user_info").subscribe(data => {
      this.user_info = data;
      // console.log(data);
      if (this.content != undefined) {
        this.content.forEach(e => {
          if (this.user_info != undefined) {
            this.user_info.forEach(e2 => {
              if (e.uid == e2.uid) {
                this.nickname.push(e2.nickname);
                this.avatar.push('../assets/imgs/avatar/' + e2.avatar);
              }
            });
          }
        });
      }
      // console.log(this.nickname,this.avatar);
    });
  }
  ionViewDidLoad() {
    this.events.subscribe('ContactPage', () => {
      // console.log("刷新");
      this.ionViewDidEnter();
    });
  }
}
