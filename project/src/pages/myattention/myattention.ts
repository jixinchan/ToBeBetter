import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the MyattentionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myattention',
  templateUrl: 'myattention.html',
})
export class MyattentionPage {

  flag = false;
  uid;
  aid;
  attention;

  change(i) {
    if (i == 0) {
      this.flag = !this.flag;
      this.http.post("/api/attention", {
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
              this.http.post("/api/noattention", {
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    //得到uid
    this.uid = localStorage.getItem("uid");
    console.log(this.uid);

    this.http.post('/api/myattention', {"uid": this.uid}).subscribe(data => {
      this.attention = data;
      console.log(data);
      this.attention.forEach(e => {
        e.avatar = '../assets/imgs/avatar/' + e.avatar;
      });
    });
  }



  ionViewDidLoad() {
    console.log("ionViewDidLoad MyattentionPage");
  }

}
