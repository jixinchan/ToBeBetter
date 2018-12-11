import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isActive = 0;
  isClick(i) {
    this.isActive = i;
  }

  uid;
  tuijian;
  yiji;
  should; avoid;

  user_info;
  result;
  weather;//天气情况
  temperature;//温度
  humidity;//湿度
  img;//图片
  city;//城市
  location: {
    city: string,
  };
  constructor(public navCtrl: NavController, public http: HttpClient, public weatherProvider: WeatherProvider, public storage: Storage) {
    //得到uid
    this.uid = localStorage.getItem("uid");

    this.http.post('/api', {
      "uid": this.uid
    }).subscribe(data => { });

    // 得到宜忌内容
    this.http.get('/api/yiji').subscribe(data => {
      this.yiji = data;
      var num = Math.floor(Math.random() * this.yiji.length);
      // console.log(num);
      this.should = this.yiji[num].should;
      this.avoid = this.yiji[num].avoid;
      // console.log(this.yiji[num].should);
    });


    // 得到推荐推文
    this.http.get('/api/tuijian').subscribe(data => {
      this.tuijian = data;
      // console.log(data);
      this.tuijian.forEach(e => {
        e.imgs = '../assets/imgs/images/' + e.imgs;
      });
    });
  }

  jianshen;
  goJianShen() {
    this.http.get('/api/jianshen').subscribe(data => {
      this.jianshen = data;
      // console.log(data);
      this.jianshen.forEach(e => {
        e.imgs = '../assets/imgs/images/' + e.imgs;
      });
    });
  }

  yinshi;
  goYinShi() {
    this.http.get('/api/yinshi').subscribe(data => {
      this.yinshi = data;
      // console.log(data);
      this.yinshi.forEach(e => {
        e.imgs = '../assets/imgs/images/' + e.imgs;
      });
    });
  }

  liliao;
  goLiLiao() {
    this.http.get('/api/liliao').subscribe(data => {
      this.liliao = data;
      // console.log(data);
      this.liliao.forEach(e => {
        e.imgs = '../assets/imgs/images/' + e.imgs;
      });
    });
  }


  goHomeTail(rid) {
    // this.http.post('/api/hometail',{
    //   "title":title
    // }).subscribe(data=>{});

    this.navCtrl.push("HometailPage", { 'rid': rid });
  }
  ionViewWillEnter() {
    this.http.get("/api/contact/user_info").subscribe(data => {
      this.user_info = data;
      if (this.user_info != undefined) {
        this.user_info.forEach(e => {
          if (e.uid == this.uid) {
            this.city = e.city;
            // console.log(this.city2);
          }
        });
      }
    });

    this.storage.get('location').then((val) => { // 获取本地储存的数据并根据城市名称初始化城市数据     
      if (val != null) { // 如果本地储存的数据不为空
        this.location = JSON.parse(val);
        // console.log(val);
      } else {
        this.location = {
          city: this.city,
        }
      }
      // 用天气服务获得当前城市的天气数据
      this.weatherProvider.getWeather(this.location.city).subscribe(result => {
        console.log(result["showapi_res_body"]["cityInfo"]);
        // console.log(result["showapi_res_body"]["f1"]);
        this.result = result["showapi_res_body"]["f1"];
        this.weather = this.result['day_weather'];
        this.temperature = this.result['day_air_temperature'];
        this.humidity = this.result['jiangshui'];
        this.img = this.result['day_weather_pic'];
        // console.log(this.weather, this.temperature, this.humidity);
      });
    });
  }
}
