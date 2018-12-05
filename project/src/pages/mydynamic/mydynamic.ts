import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the MydynamicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mydynamic',
  templateUrl: 'mydynamic.html',
})
export class MydynamicPage {
  content;
  uid;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient) {
    // //得到uid
    this.uid = localStorage.getItem("uid");
    // console.log(this.uid);
    
    this.http.post('/api/mydynamic',{
      "uid":this.uid
    }).subscribe(data=>{
      this.content = data;
      // console.log(data);
      this.content.forEach(e=>{
        e.imgs = '../assets/imgs/'+e.imgs;
      });
    });
  }

  goContacTail(did){
    this.http.post('/api/contactail',{
      "did":did
    }).subscribe(data=>{});

    this.navCtrl.push("ContactailPage");
  }
}
