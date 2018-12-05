import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

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
  goContactail(i) {
    this.navCtrl.push('ContactailPage', { index: i, nickname: this.nickname, avatar: this.avatar });
    // console.log(i);
  }
  goRelease() {
    this.navCtrl.push('ReleasePage');
  }
  goSearch() {
    this.navCtrl.push('SearchPage');
  }

  constructor(public navCtrl: NavController, public http: HttpClient) {
    this.http.get("/api/contact").subscribe(data => {
      this.content = data;
      // console.log(data);
      this.content.forEach(e => {
        e.imgs = "../assets/imgs/" + e.imgs;
      });
    });

    this.http.get("/api/contact/user_info").subscribe(data => {
      this.user_info = data;
      // console.log(data);
      this.content.forEach(e => {
        this.user_info.forEach(e2 => {
          if (e.uid == e2.uid) {
            this.nickname.push(e2.nickname);
            this.avatar.push('../assets/imgs/avatar/' + e2.avatar);
          }
        });
      });
      // console.log(this.nickname,this.avatar);
    });
  }
  ionViewDidLoad() {
  }
}
