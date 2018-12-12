import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController} from 'ionic-angular';
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
  rid;
  collected;

  isEmpty(obj) {
    for(var k in obj){
      return false;  // 非空
    }
    return true;  // 空
  }
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public http: HttpClient,
              public modalCtrl: ModalController
            ) {
    
    this.rid = this.navParams.get('rid');
    // 获得文章内容
    this.http.post('/api/hometail',{'rid':this.rid}).subscribe(data=>{
      this.article = data;
      this.article.forEach(e => {
        e.imgs = '../assets/imgs/images/'+e.imgs;
        this.paragraph = e.content.split("%%%");
      });
    });

    this.uid = localStorage.getItem("uid");
    
    // 查询是否已经收藏
    this.http.post('/api/hometail/iscollect',{
      'rid':this.rid,
      'uid':this.uid
    }).subscribe((data)=>{
      this.collected = data;
      // console.log(this.collected);
      if(!this.isEmpty(this.collected)){  //data 非空
        document.querySelectorAll('.star')[0].className += ' collected';
      }
    });

  }
    
  ionViewDidLoad() {}

  
  // 收藏
  isCollect(rid){
    // document.querySelectorAll('.star')[0].className += ' collected';
    var iscollect = document.querySelectorAll('.star')[0].className.indexOf(' collected');
    // console.log(iscollect);
    if(iscollect === -1){  // 未收藏->已收藏
      document.querySelectorAll('.star')[0].className += ' collected';
      // console.log('未收藏->已收藏： ',document.querySelectorAll('.star')[0].className);
      this.http.post('/api/hometail/collect',{
        "uid":this.uid,
        "rid":rid
      }).subscribe(data=>{});
    }
    else{  // 已收藏->未收藏
      document.querySelectorAll('.star')[0].className = document.querySelectorAll('.star')[0].className.slice(0,37);
      // console.log('已收藏->未收藏： ',document.querySelectorAll('.star')[0].className);
      this.http.post('/api/hometail/uncollect',{
        "uid":this.uid,
        "rid":rid
      }).subscribe(data=>{});
    }
  }

// 分享
  goShare() {
    let profileModal = this.modalCtrl.create('SharePage');
    profileModal.present();
  }


}
