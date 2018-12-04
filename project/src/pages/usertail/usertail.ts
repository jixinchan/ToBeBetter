import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { ReciveServeProvider } from '../../providers/recive-serve/recive-serve';

/**
 * Generated class for the UsertailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-usertail',
  templateUrl: 'usertail.html',
  providers:[ReciveServeProvider],
  
})
export class UsertailPage {
  uid;//用户id
  avatar;//头像
  nickname;//昵称
  signature;//个签
  sex;//性别
  birth;//生日
  city;//城市
  account;//用户手机号

  listData=[];
  constructor(private reciveServe: ReciveServeProvider,public alertCtrl:AlertController, public http:HttpClient, public navCtrl: NavController) {
  }
  headers = new HttpHeaders( {'Content-Type':'application/x-www-form-urlencoded'} );
  ionViewDidLoad() {
    this.uid=localStorage.getItem('uid');
    console.log('ionViewDidLoad UsertailPage');
    this.http.post('/api/usertail',{'uid':this.uid},{headers:this.headers}).subscribe(data=>{
      this.avatar = './assets/imgs/'+data[0].avatar;
      this.nickname = data[0].nickname;
      this.signature = data[0].signature;
      this.sex = data[0].sex;
      this.city = data[0].city;
      this.birth = data[0].birth.substring(0,10);
    });
    this.http.post('/api/usertail/tel',{'uid':this.uid},{headers:this.headers}).subscribe(data=>{
      this.account = data[0].account;
    });

    this.getRequestContact();
  }
  goEdit(){
    
  }
  getRequestContact() {
    this.reciveServe.getRequestContact().subscribe(res => {
        this.listData = res.json();
    }, error => {
        console.log(error);
    })
}
  
  
  cityP = this.alertCtrl.create({
    inputs:[{
      type:'date',
    }]
  });
  //性别弹框
  presentSex() {
    let sexP = this.alertCtrl.create({
      inputs: [{      
          type: 'radio',
          label: '女',
          value: '女',
        },{
          type: 'radio',
          label: '男',
          value: '男'
        }],
      buttons: [{
          text: 'OK',
          handler: (data) => {
            this.sex=data;
          }
        }
      ]
    });
    sexP.present();
  }
  //生日弹框
  presentBirth(){
    let birthP = this.alertCtrl.create({
      title:'选择您的生日',
      inputs:[{
        type:'date',
      }],
      buttons: [{
        text:'OK',
        handler:data=>{
          this.birth=data['0'];
        }
      }]
    });
    birthP.present();
  }
  //城市弹框
  presentCity(){

  }

}
