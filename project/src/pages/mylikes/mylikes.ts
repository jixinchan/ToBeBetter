import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the MylikesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mylikes',
  templateUrl: 'mylikes.html',
})
export class MylikesPage {

  isActive = 0;
  isClick(i) {
    this.isActive = i;
  }

  dyna;
  uid;
  title;
  did;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    //得到uid
    this.uid = localStorage.getItem("uid");

    this.http.post('/api/mylikesd', {
      "uid": this.uid
    }).subscribe(data => {
      this.dyna = data;
      // console.log(data);
      this.dyna.forEach(e => {
        e.imgs = '../assets/imgs/' + e.imgs;
      });
    });

  }

  reco;
  goReco() {
    this.http.post('/api/mylikesr', {
      "uid": this.uid
    }).subscribe(data => {
      this.reco = data;
      // console.log(data);
      this.reco.forEach(e => {
        e.imgs = '../assets/imgs/images/' + e.imgs;
      });
    });
  }

  goHomeTail(title){
    // this.http.post('/api/hometail',{
    //   "title":title
    // }).subscribe(data=>{});

    this.navCtrl.push("HometailPage",{'title':title});
  }
  goMydynamicTail(did){
    // this.http.post('/api/hometail',{
    //   "title":title
    // }).subscribe(data=>{});

    this.navCtrl.push("MydynamictailPage",{'did':did});
  }
}
