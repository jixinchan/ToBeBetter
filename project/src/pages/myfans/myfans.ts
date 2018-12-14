import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the MyfansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myfans',
  templateUrl: 'myfans.html',
})
export class MyfansPage {

  // uid;
  // fans;
  // fansa;
  // flag = [];
  // fensi = [];
  // guanzhu= [];

    

  // change(i,j) {
  //   if (i == 0) {
  //     this.flag[j] = !this.flag[j];
  //     this.http.post("/api/myfans/attention", {
  //       "uid": this.uid,
  //       "aid": this.guanzhu[j]
  //     }).subscribe(data => {
  //      });
  //   } else {
  //     let alert = this.alertCtrl.create({
  //       message: '确认不再关注？',
  //       buttons: [
  //         {
  //           text: '确认',
  //           handler: () => {
  //             this.flag[j] = !this.flag;
  //             this.http.post("/api/myfans/noattention", {
  //               "uid": this.uid,
  //               "aid": this.guanzhu[j]
  //             }).subscribe(data => {
  //              });
  //           }
  //         },
  //         {
  //           text: '取消',
  //           handler: () => {

  //           }
  //         }
  //       ]
  //     });
  //     alert.present();
  //   }
  // }

  uid;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public modalCtrl: ModalController, public alertCtrl: AlertController) {
    this.uid = localStorage.getItem("uid");
  }

  isEmpty(obj){
    for(var k in obj){
      return false;
    }
    return true;
  }
  start(uid){
    document.querySelectorAll('.u'+uid)[0].innerHTML = '互相关注';
  }
  fans;
  temp;
  ionViewDidEnter(){
    this.http.post('/api/myfans',{
      "uid":this.uid
    }).subscribe((data)=>{
      // console.log('fensi',data);
      this.fans=data;
      this.fans.forEach(e => {
        // console.log(e.uid);
        this.http.post('/api/myfansa',{
          "uid":this.uid,
          "aid":e.uid
        }).subscribe((data1)=>{
          e.avatar = '../assets/imgs/avatar/' + e.avatar;
          this.temp = data1;
          console.log('w',this.isEmpty(this.temp));
          if(!this.isEmpty(this.temp)){
            document.querySelectorAll('.u'+ e.uid)[0].innerHTML = '互相关注';
            document.querySelectorAll('.u'+ e.uid)[0].className += ' border';
          }
        })
      });
    })
  }


  change(uid){
    console.log(uid);
      if(document.querySelectorAll('.u'+uid)[0].innerHTML === '互相关注'){
        this.http.post('/api/myfans/noattention',{
          "uid":this.uid,
          "aid":uid
        }).subscribe(()=>{});
        document.querySelectorAll('.u'+uid)[0].innerHTML = '+关注';
        document.querySelectorAll('.u'+uid)[0].className = document.querySelectorAll('.u'+uid)[0].className.slice(0,14);
      }
      else{
        this.http.post('/api/myfans/attention',{
          "uid":this.uid,
          "aid":uid
        }).subscribe(()=>{})
        document.querySelectorAll('.u'+uid)[0].innerHTML = '互相关注';
        document.querySelectorAll('.u'+uid)[0].className += ' border';
        
      }
  }

  // ionViewDidEnter(){
  //   //得到uid
  //   this.uid = localStorage.getItem("uid");
  //   console.log(this.uid);

  //   this.http.post('/api/myfans', {"uid": this.uid}).subscribe(data => {
  //     this.fans = data;
  //     console.log(data);
  //     this.fans.forEach(e => {
  //       e.avatar = '../assets/imgs/avatar/' + e.avatar;        
  //       this.fensi.push(e.uid);
  //     });
  //   });

  //   this.http.post('/api/myfansa', {"uid": this.uid}).subscribe(data => {
  //     this.fansa = data;
  //     console.log(data);
  //     this.fansa.forEach(e => {  
  //       this.guanzhu.push(e.aid);
  //     });
  //   });

  //     for(var i=0;i<this.fensi.length;i++){
  //       this.flag[i] = false;
  //       for(var j=0;j<this.guanzhu.length;j++){
  //         if(this.fensi[i] == this.guanzhu[j])
  //         {
  //           this.flag[i] = true;
  //         }
  //       }
  //     }
  //     console.log(this.flag);

  // }
  
}
