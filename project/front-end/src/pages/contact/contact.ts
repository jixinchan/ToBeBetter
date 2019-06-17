import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { QuickloginProvider } from '../../providers/quicklogin/quicklogin';
import { Events } from 'ionic-angular';
import { disableDebugTools } from '@angular/platform-browser';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  content;
  love = [10, 23, 17, 19, 11, 12,0,0];
  user_info;
  nickname = [];
  avatar = {};
  uid;//游客
  duids=[];
  uids=[];
  dids=[];
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
  ionViewWillEnter() {
    this.http.get("/api/contact").subscribe(data => {
      this.content = data;
      // console.log(data);
      if (this.content != undefined) {
        this.content.forEach(e => {
          this.http.get('/api/imgs/download',{params:{name:e.imgs}}).subscribe(data=>{
             e.imgs ='data:image/jpeg;base64,'+data['name'];
          })
        });
 
        this.http.get("/api/contact/user_info").subscribe(data => {
          this.user_info = data;
          // console.log(data);
          this.dids=[];
          this.nickname=[];
          this.content.forEach(e => {
            if (this.user_info != undefined) {
              this.user_info.forEach(e2 => {
                if (e.uid == e2.uid) {
                  this.dids.push(e.did);
                  this.nickname.push(e2.nickname);
                  this.uids.push(e2.uid);
                  this.http.get('/api/imgs/avatar',{params:{name:e2.avatar}}).subscribe(data=>{
                    this.avatar[e.did]='data:image/jpeg;base64,'+data['name'];
                  })
                }
              });
            }
          });
          // console.log(this.nickname,this.avatar);
        });
      }
    });
  }
  ionViewDidLoad() {
    this.events.subscribe('ContactPage', () => {
      // console.log("刷新");
      this.ionViewWillEnter();
    });
  }
}
