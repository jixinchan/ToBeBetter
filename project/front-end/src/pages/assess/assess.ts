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
  sids=[];
  times = [];
  contents = [];
  nickname = [];
  avatar = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {}

  ionViewDidEnter(){    
    this.did = this.navParams.get("did");

    //评论  
    this.http.get('/api/contact/contactail/assess').subscribe(data => {
      this.assess = data;

      this.http.get("/api/contact/user_info").subscribe(data => {
        this.user_info = data;
        // console.log(data);
        this.sids=[];
        this.uids=[];
        this.times=[];
        if (this.user_info != undefined) {
          if (this.assess != undefined) {
            this.assess.forEach(e => {
              if (e.did == this.did) {
                this.sids.push(e.sid);
                this.uids.push(e.uid);
                this.times.push(e.time);
                this.contents.push(e.content);
              }
            });
            this.num = this.uids.length;
            // console.log(this.uids, this.times, this.contents);
          }
          this.uids.forEach((e,idx) => {
            if (this.uids != undefined) {
              this.user_info.forEach((e2) => {
                if (e == e2.uid) {
                  this.nickname.push(e2.nickname);
                  this.http.get('/api/imgs/avatar',{params:{name:e2.avatar}}).subscribe(data=>{
                    this.avatar[this.sids[idx]]='data:image/jpeg;base64,'+data['name'];
                  })
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
