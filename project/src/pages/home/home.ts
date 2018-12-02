import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import{ HometailPage} from '../hometail/hometail';
import { HttpClient } from '@angular/common/http';
import { JsonpCallbackContext } from '@angular/common/http/src/jsonp';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isActive=0;
  isClick(i){
    this.isActive=i;
  }

  uid;
  tuijian;
  constructor(public navCtrl: NavController,public http:HttpClient) {
    // localStorage.setItem("uid","1");
    //得到uid
    this.uid = localStorage.getItem("uid");
    
    this.http.post('/api',{
      "uid":this.uid
    }).subscribe(data=>{});

    this.http.get('/api/tuijian').subscribe(data=>{
      this.tuijian = data;
      // console.log(data);
      this.tuijian.forEach(e => {
        e.imgs = '../assets/imgs/images/'+e.imgs;
      });
    });
  }

  jianshen;
  goJianShen(){    
    this.http.get('/api/jianshen').subscribe(data=>{
      this.jianshen = data;
      // console.log(data);
      this.jianshen.forEach(e => {
        e.imgs = '../assets/imgs/images/'+e.imgs;
      });
    });
  }

  yinshi;
  goYinShi(){    
    this.http.get('/api/yinshi').subscribe(data=>{
      this.yinshi = data;
      // console.log(data);
      this.yinshi.forEach(e => {
        e.imgs = '../assets/imgs/images/'+e.imgs;
      });
    });
  }

  liliao;
  goLiLiao(){    
    this.http.get('/api/liliao').subscribe(data=>{
      this.liliao = data;
      // console.log(data);
      this.liliao.forEach(e => {
        e.imgs = '../assets/imgs/images/'+e.imgs;
      });
    });
  }

  
  goHomeTail(title){
    this.http.post('/api/hometail',{
      "title":title
    }).subscribe(data=>{});

    this.navCtrl.push("HometailPage");
  }



  
  // goarticle(){
  //   this.navCtrl.push(HometailPage);
  // }
  
  // arr=['推荐','健身','饮食','理疗'];


}
