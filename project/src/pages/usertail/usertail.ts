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
  bcity;


  cancel='取消';
  done='完成';

  listData=[];
  constructor(private reciveServe: ReciveServeProvider,public alertCtrl:AlertController, public http:HttpClient, public navCtrl: NavController) {
    this.getRequestContact();
  }
  headers = new HttpHeaders( {'Content-Type':'application/x-www-form-urlencoded'} );
  ionViewDidLoad() {  
    this.uid=localStorage.getItem('uid');
    this.http.post('/api',{'uid':this.uid},{headers:this.headers});
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
  }


  //保存个人资料
  save(){
    this.http.post('/api/usertail/save',{
      'avatar':this.avatar.substring(14),
      'nickname':this.nickname,
      'signature':this.signature,
      'sex':this.sex,
      'birth':this.birth,
      'city':this.cityFliter(this.city),
      'account':this.account
    },{headers:this.headers}).subscribe(data=>{});
  }
  
  //城市选择
  getRequestContact() {
    this.reciveServe.getRequestContact().subscribe(res => {
        this.listData = res.json();
        console.log(this.listData);
    }, error => {
        console.log(error);
    })
  }

  cityFliter(val){
    console.log(this.city,this.bcity);
    if(this.city===this.bcity){
      return this.city;
    }else{
      this.city='';
      var province = val.substring(0,6);
      var shi = val.substring(7,13);
      var xian = val.substring(14);
      console.log(province,shi,xian);
      this.city+=this.listData[0].options.find(function(e){
        return e.value===province;
      }).text;
      this.city+=this.listData[1].options.find(function(e){
        return e.value===shi;
      }).text;
      this.city+=this.listData[2].options.find(function(e){
        return e.value===xian;
      }).text;
      console.log(this.city);
      return this.city;
    }
    
  }

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
  
}
