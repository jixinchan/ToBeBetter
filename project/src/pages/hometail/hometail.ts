import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController} from 'ionic-angular';
// import { AlertController } from 'ionic-angular';
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
              public http: HttpClient,
              public modalCtrl: ModalController
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
  goShare() {
    let profileModal = this.modalCtrl.create('SharePage');
    profileModal.present();
  }


}
