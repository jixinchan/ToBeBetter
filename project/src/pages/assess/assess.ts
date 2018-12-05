import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the AssessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-assess',
  templateUrl: 'assess.html',
})
export class AssessPage {
  num;
  did;
  assess;
  user_info;
  dids = [];
  uids = [];
  times = [];
  contents = [];
  nickname = [];
  avatar = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.did = this.navParams.get("did");
    // console.log(this.did);

    this.http.get('/api/contact/contactail/assess2').subscribe(data => {
      // console.log(data);
      this.assess=[];
      this.assess = data;
      this.uids = [];
      this.times = [];
      this.assess.forEach(e => {
        if (e.did == this.did) {
          this.uids.push(e.uid);
          this.times.push(e.time);
          this.contents.push(e.content);
        }
      });
      this.num=this.uids.length;
      // console.log(this.uids,this.times,this.contents);
    });

    this.http.get("/api/contact/user_info").subscribe(data => {
      this.user_info = data;
      // console.log(data);
      this.nickname = [];
      this.avatar = [];
      this.user_info.forEach(e => {
        this.uids.forEach(e2 => {
          if (e2 == e.uid) {
            this.nickname.push(e.nickname);
            this.avatar.push('../assets/imgs/avatar/' + e.avatar);
          }
        });
      });
      // console.log(this.nickname, this.avatar);
    });
  }
  ionViewDidLoad() {
  }
}
