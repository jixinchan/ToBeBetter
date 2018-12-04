import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the HometailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-hometail',
  templateUrl: 'hometail.html',
})
export class HometailPage {

  article;
  paragraph;
  uid;
  title;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              public http: HttpClient
            ) {
    // this.newLeave.sqsj=new Date(new Date().getTime()+8*60*60*1000).toISOString();//北京时间
    
    this.title=this.navParams.get('title');
    // 获得文章内容
    this.http.post('/api/hometail',{'title':this.title}).subscribe(data=>{
      this.article = data;
      this.article.forEach(e => {
        e.imgs = '../assets/imgs/images/'+e.imgs;
        this.paragraph = e.content.split("%%%");
      });
    });

    this.uid = localStorage.getItem("uid");

  }
    
  ionViewDidLoad() {
    // console.log('ionViewDidLoad HometailPage');
  }

  
  // 收藏
  isActive=-1;
  collect(rid){
    this.isActive=0;
    // localStorage.setItem('Collected',rid);

    this.http.post('/api/collect',{
      "uid":this.uid,
      "rid":rid
    }).subscribe(data=>{});
  }
  uncollect(rid){
    this.isActive = -1;
    this.http.post('/api/uncollect',{
      "uid":this.uid,
      "rid":rid
    }).subscribe(data=>{});
  }

// 分享
  Share() {
    let alert = this.alertCtrl.create({
      title: '分享给朋友',
      message: '&nbsp;<img src="../assets/imgs/wechat.png" width="50px" style="margin-right:20px"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../assets/imgs/QQ.png" width="50px"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../assets/imgs/微博.png" width="50px"/>',
      buttons: ['取消']
    });
    alert.present();
  }


}
