import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, NavParams, ActionSheetController,} from 'ionic-angular';
import { HttpClient ,HttpHeaders} from '@angular/common/http';
import { ReciveServeProvider } from '../../providers/recive-serve/recive-serve';
import {ImagePicker, ImagePickerOptions} from "@ionic-native/image-picker";
import {Camera, CameraOptions} from "@ionic-native/camera";

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
  constructor(private reciveServe: ReciveServeProvider, 
    public http:HttpClient, public navCtrl: NavController,public actionSheetCtrl: ActionSheetController, 
    public alertCtrl: AlertController, public imagePicker: ImagePicker, public camera: Camera
      ) {
    this.uid=localStorage.getItem('uid');
    
    this.http.post('/api/usertail',{
      'uid':this.uid
    }).subscribe(data=>{
      this.avatar = './assets/imgs/avatar/'+data[0].avatar;
      this.nickname = data[0].nickname;
      this.signature = data[0].signature;
      this.sex = data[0].sex;
      this.city = data[0].city;
      this.birth = data[0].birth?data[0].birth.substring(0,9)+(Number(data[0].birth.substring(9,10))+1):data[0].birth;
      console.log(data[0].birth,this.birth);
    });
    this.http.post('/api/usertail/tel',{'uid':this.uid},{headers:this.headers}).subscribe(data=>{
      this.account = data[0].account;
    });
    
    this.getRequestContact();
  }
  //头像
  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      buttons: [{
        text: '拍照',
        role: 'takePhoto',
        handler: () => {
          this.takePhoto();
        }
      }, {
        text: '从相册选择',
        role: 'chooseFromAlbum',
        handler: () => {
          this.chooseFromAlbum();
        }
      }, {
        text: '取消',
        role: 'cancel',
        handler: () => {
          console.log("cancel");
        }
      }]
    });

    actionSheet.present().then(value => {
      return value;
    });
  }
  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      targetWidth: 200,
      targetHeight: 200,
      saveToPhotoAlbum: true,
    };

    this.camera.getPicture(options).then(image => {
      console.log('Image URI: ' + image);
      this.avatar = image.slice(7);
    }, error => {
      console.log('Error: ' + error);
    });
  }

  chooseFromAlbum() {
    const options: ImagePickerOptions = {
      maximumImagesCount: 1,
      width: 200,
      height: 200
    };
    this.imagePicker.getPictures(options).then(images => {
      if (images.length > 1) {
        this.presentAlert();
      } else if (images.length === 1) {
        console.log('Image URI: ' + images[0]);
        this.avatar = images[0].slice(7);
      }
    }, error => {
      console.log('Error: ' + error);
    });
  }

  presentAlert() {
    let alert = this.alertCtrl.create({title: "上传失败", message: "只能选择一张图片作为头像哦", buttons: ["确定"]});
    alert.present().then(value => {
      return value;
    });
  }

  ionViewDidLoad() {   
  }
  buttonClick(){
    this.navCtrl.push('EditPage');
  }
  //保存个人资料
  save(){
    console.log(this.bcity);
    
    this.http.post('/api/usertail/save',{
      'avatar':this.avatar.substring(21),
      'nickname':this.nickname,
      'signature':this.signature,
      'sex':this.sex,
      'birth':this.birth,
      'city':this.cityFliter(this.bcity),
      'account':this.account,
      'uid':this.uid
    }).subscribe(data=>{});
  }
  //城市选择
  getRequestContact() {
    this.reciveServe.getRequestContact().subscribe(res => {
        this.listData = res.json();
    }, error => {
        console.log(error);
    })
  }
  //将对应城市码转为文字
  cityFliter(val){
    // console.log(typeof this.bcity);
    if(typeof this.bcity=='undefined'){
      return this.city;
    }else{
      this.city='';
      var province = val.substring(0,6);
      var shi = val.substring(7,13);
      var xian = val.substring(14);
      this.city+=this.listData[0].options.find(function(e){
        return e.value===province;
      }).text;
      this.city+=this.listData[1].options.find(function(e){
        return e.value===shi;
      }).text;
      this.city+=this.listData[2].options.find(function(e){
        return e.value===xian;
      }).text;
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
          checked:true
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
