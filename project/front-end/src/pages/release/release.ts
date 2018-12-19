import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController, AlertController } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { Events } from 'ionic-angular';

/**
 * Generated class for the ReleasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-release',
  templateUrl: 'release.html',
})
export class ReleasePage {
  data;
  temp = [];
  uid = localStorage.getItem("uid");
  avatar = ["../assets/imgs/add.png"];
  title;
  txt;
  time;
  class;
  cid;
  imgName;
  release() {
    var mytime = new Date();
    var formatDateTime = function (date) {
      var m = date.getMonth() + 1;
      m = m < 10 ? ('0' + m) : m;
      var d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      var h = date.getHours();
      var minute = date.getMinutes();
      minute = minute < 10 ? ('0' + minute) : minute;
      return m + '-' + d + ' ' + h + ':' + minute;
    };
    this.time = formatDateTime(mytime);
    // alert("uid:"+this.uid+"title:"+this.title+"content:"+this.txt+"time:"+this.time+"cid:"+this.cid);
    this.http.post('/api/contact/release', {
      "uid": this.uid,
      "title": this.title,
      "content": this.txt,
      "imgs": this.imgName,
      "cid": this.cid,
      "time": this.time
    }).subscribe(data => { });
    this.navCtrl.pop().then(()=>{
      this.events.publish('ContactPage');
    });
  }
  key() {
    let alert = this.alertCtrl.create({
      inputs: [{
        type: 'radio',
        label: '健身',
        value: '健身',
        checked: true
      }, {
        type: 'radio',
        label: '饮食',
        value: '饮食'
      }, {
        type: 'radio',
        label: '理疗',
        value: '理疗'
      }],
      buttons: [{
        text: 'OK',
        handler: (data) => {
          this.class = data;
          if (data == '健身') {
            this.cid = 1;
          } else if (data == '饮食') {
            this.cid = 2;
          } else {
            this.cid = 3;
          }
        }
      }
      ]
    });
    alert.present();
  }
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
          alert("cancel");
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
      targetWidth: 360,
      targetHeight: 200,
      saveToPhotoAlbum: false,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: 2
    };

    this.camera.getPicture(options).then(image => {
      let base64Image = 'data:image/jpeg;base64,' + image;
      // alert(base64Image);
      this.http.post('/api/contact/release/dynamic', {
        'dynamic': image,
        'name': this.imgName
      }).subscribe(data => { });
      this.avatar[0] = base64Image;
    }, error => {
      alert(error);
    });
  }
  chooseFromAlbum() {
    const options: CameraOptions = {
      quality: 100,
      allowEdit: true,
      targetWidth: 360,
      targetHeight: 200,
      saveToPhotoAlbum: false,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 0
    };

    this.camera.getPicture(options).then(image => {
      let base64Image = 'data:image/jpeg;base64,' + image;
      this.http.post('/api/contact/release/dynamic', {
        'dynamic': image,
        'name': this.imgName
      }).subscribe(data => { });
      // alert(base64Image);
      this.avatar[0] = base64Image;
    }, error => {
      alert(error);
    });
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public imagePicker: ImagePicker,
    public camera: Camera,
    public events: Events) {

  }
  ionViewDidEnter() {
    this.http.get("/api/contact").subscribe(data => {//重命名
      // console.log(data);
      this.data = data;
      this.data.forEach(e => {
        if (e.uid == this.uid) {
          this.temp.push(e.imgs);
        }
      });
      // console.log(this.temp[0]);
      if (this.temp[0] == undefined) {
        this.imgName = this.uid + "_1.jpg";
      } else {
        var i = ((this.temp[0].split("_"))[1].split("."))[0];
        this.imgName = this.uid + "_" + (++i) + ".jpg";
      }
      // console.log(this.imgName);
    });
  }
}
