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
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {}

  ionViewDidEnter(){    
    this.did = this.navParams.get("did");
    // this.assess = this.navParams.get("assess");
    //评论  
    this.http.get('/api/contact/contactail/assess').subscribe(data => {
      this.assess = data;
      // console.log('11111111111',this.assess);

      this.http.get("/api/contact/user_info").subscribe(data => {
        this.user_info = data;
        // console.log(data);
        this.nickname = [];
        this.avatar = [];
        if (this.user_info != undefined) {
          if (this.assess != undefined) {
            this.assess.forEach(e => {
              if (e.did == this.did) {
                this.uids.push(e.uid);
                this.times.push(e.time);
                this.contents.push(e.content);
              }
            });
            this.num = this.uids.length;
            // console.log(this.uids, this.times, this.contents);
          }
          this.user_info.forEach(e => {
            if (this.uids != undefined) {
              this.uids.forEach(e2 => {
                if (e2 == e.uid) {
                  this.nickname.push(e.nickname);
                  this.avatar.push('../assets/imgs/avatar/' + e.avatar);
                }
              });
            }
          });
        }
        // console.log(this.nickname, this.avatar);
      });

    });
 
  }

}
