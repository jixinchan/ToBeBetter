import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    this.i = this.navParams.get("index");
  }
  ionViewDidLoad() {//"http://10.7.86.67:8080/contact"
    this.http.get("http://192.168.0.109:8080/contact").subscribe(data => {
      this.data = data;
      // console.log(data);
      this.data.forEach(e => {
        this.imgs.push("../assets/imgs/" + e.imgs);
        this.title.push(e.title);
        this.content.push(e.content);
      });
      // console.log(this.title,this.imgs,this.content);
    });

    this.http.get("http://192.168.0.109:8080/contactail").subscribe(data => {
      this.class = data;
      // console.log(data);
      this.data.forEach(e => {
        this.class.forEach(c => {
          if (e.cid == c.cid) {
            this.className.push(c.className);
          }
        });
      });
      // console.log(this.className);
    });
  }

}
