import { Component ,NgZone, ViewChild} from '@angular/core';
import { NavController, Events, App } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { WeatherProvider } from '../../providers/weather/weather';
import { QuickloginProvider } from '../../providers/quicklogin/quicklogin';
import { Geolocation } from '@ionic-native/geolocation';

declare const baidumap_location: any;
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
  yaoshan;
  qiju;
  qingzhi;

  user_info;
  result;
  weather;//天气情况
  temperature;//温度
  cold;//感冒
  guomin;//过敏
  clothes;//穿衣
  img;//图片
  city;//城市

  nocity=false;
  

  //调理是否展开
  clicks={
    'isClick1':true,
    'isClick2':true,
    'isClick3':true
  }
  header=true;
  show(i){
    if(this.clicks['isClick'+i]){
      this.clicks['isClick'+i]=false;
    }else{
      this.clicks['isClick'+i]=true;
    }
    
  }
  //滚动到轮播图下出现顶栏
  scrollHandler(event) {
    this.zone.run(()=>{
      if(event.scrollTop>200){
        this.header=false;
      }else{
        this.header=true;
      }
    })
  }

  //定位函数
  location={
    city:this.city
  };
  getLocation(){
    // this.geolocation.getCurrentPosition().then(response=>{
    //   console.log('location res:',response);
    //   this.location.latitude=response.coords.latitude+'';
    //   this.location.longitude=response.coords.longitude+'';
    // }).catch(err=>{
    //   console.log(err.message);
    // });
    // if (typeof baidumap_location === 'undefined') { 
    //   alert('baidumap_location is undefined'); 
    //     return; 
    // }; 
    // baidumap_location.getCurrentPosition(function (result) { 
    //     alert(JSON.stringify(result, null, 4)); 
    // }, function (error) { 
    //     alert(error); 
    // });
    // if ('baidumap_location' in window) {
    //   baidumap_location.getCurrentPosition(function (result) {
    //       console.log(result);
    //   }, function (error) {
    //       console.error(error);
    //   });
    // } else {
    //     console.error('baidumap_location is undefined');
    // }
  }

  

  constructor(public navCtrl: NavController, public http: HttpClient, 
    public weatherProvider: WeatherProvider,public events:Events,
    public quicklogin:QuickloginProvider ,public zone: NgZone,
    public geolocation:Geolocation,public app: App ) {
    
  }
 
  goLogin(){
    this.app.getRootNavs()[0].setRoot('LoginPage');
  }

  goHomeTail(rid) {
    console.log('rid',rid);
    this.navCtrl.push("HometailPage", { 'rid': rid });
  }
  ionViewWillEnter() {
    this.clicks={
      'isClick1':true,
      'isClick2':true,
      'isClick3':true
    }
    //得到uid
    this.uid = localStorage.getItem("uid");

    //获取gps
    // this.getLocation();

    // 得到宜忌内容
    this.http.post('/api/yiji',{'uid':this.uid}).subscribe(data => {
      this.yiji = data;
      var num = Math.floor(Math.random() * this.yiji.length);
      // console.log(num);
      this.should = this.yiji[num].should;
      this.avoid = this.yiji[num].avoid;
      // console.log(this.yiji[num].should);
    });


    // 得到推荐推文
    this.http.post('/api/tuijian',{'uid':this.uid}).subscribe(data => {
      this.tuijian = data;
      // console.log('tuijian:',data);
      this.tuijian.forEach(e => {
        e.content = e.content.split('%%%').toString();
        e.imgs = '../assets/imgs/images/' + e.imgs;
      });
    });

    //得到调理方案
    this.http.post('/api/tiaoli',{'uid':this.uid}).subscribe(data=>{
      // console.log('tiaoli:',data);
      this.yaoshan=data[0].medicinalfood.split('%%%');
      this.qiju=data[0].living;
      this.qingzhi=data[0].emotion;
    });

    this.http.get("/api/contact/user_info").subscribe(data => {
      this.user_info = data;
      if (this.user_info != undefined) {
        this.user_info.forEach(e => {
          if (e.uid == this.uid) {
            this.city = e.city;
            this.nocity=(e.city?false:true);
            this.location.city=this.city;
            console.log('this.location:',this.location);
            //用天气服务获得当前城市的天气数据
            this.weatherProvider.getWeather(this.location.city).subscribe(result => {
              // console.log('weather info:',result["showapi_res_body"]["cityInfo"]);
              console.log(result["showapi_res_body"]["f1"]);
              this.result = result["showapi_res_body"]["f1"];
              this.weather = this.result['day_weather'];
              this.temperature = this.result['day_air_temperature'];
              this.cold = this.result['index'].cold.desc;
              this.guomin = this.result['index'].ag.title;
              this.clothes=this.result['index'].clothes.desc;
              this.img = this.result['day_weather_pic'];
              // console.log(this.weather, this.temperature, this.humidity);
            });
          }
        });
      }
    });
  }

  ionViewDidEnter(){
    this.events.subscribe('HomePage',()=>{
      this.ionViewWillEnter();
    });
  }
  goSearch(){
    this.navCtrl.push('HomesearchPage');
  }
  goReport(){
    if(this.uid=='1'){
      this.quicklogin.quickLogin();
    }else{
      this.navCtrl.push('ReportPage');
    }  
  }

}
