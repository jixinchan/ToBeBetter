import { Component,ViewChild,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams ,Navbar} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Events } from 'ionic-angular';

declare var echarts;//设置echarts全局对象
@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html',
})
export class ReportPage {

  @ViewChild('EchartsContent') container:ElementRef;//与html中div #container1对应
  EChart :any;
  score;
  body;
  uid;
  arr=[];
  physique=['平和质', '气虚质', '阳虚质', '阴虚质', '痰湿质', '湿热质', '血瘀质', '气郁质', '特禀质'];
  physiqueid=[];
  inclination=[];
  main=1;
  name;
  explain;
  incidence;
  mentality;
  shape;
  properdiet;
  unsuitable;
  medicinalfood;
  medicinalfood1;
  living;
  emotion;
  flag;
  flag1=true;
  des;
  isEmpty(obj) {
    for(var k in obj){
      return false;  // 非空
    }
    return true;  // 空
  }
  goChart(){
    var data = [this.arr[1],this.arr[2],this.arr[3],this.arr[4],this.arr[5],this.arr[6],this.arr[7],this.arr[8],this.arr[9]];
    var dataAxis = ['平和', '气虚', '阳虚', '阴虚', '痰湿', '湿热', '血瘀', '气郁', '特禀'];
    var yMax = 100;
    var dataShadow = [];
    for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
    }
    let ctelement = this.container.nativeElement;
    if(this.EChart != null && this.EChart != "" && this.EChart != undefined) {
      this.EChart.dispose();
    }
    this.EChart = echarts.init(ctelement);
    this.EChart.setOption({
      title: {
        text: '',
        subtext: ''
    },
    grid: {
      left: '0',  
      right: '0',  
      bottom: '1%',  
      containLabel: true , 
      barWidth:5,
    },
    xAxis: {
        data: dataAxis,
        axisLabel: {
            outside: true,
            textStyle: {
                color: 'grey',
                fontSize:13,
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: {
      show:true,                         
      splitLine:{show:false},
      axisLine: {
          show: false
      },
      axisTick: {
            show: false
      },
      axisLabel: {
        show:false,
          textStyle: {
              color: '#999'
          }
      }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    series: [
        {
            type: 'bar',
            barWidth: '45%',
            data:data,
            itemStyle: {
                normal: {

                  color:function(params){
                    if(params.value >0 && params.value <30){
                      return "#aba4a4";
                    }else if(params.value >=30 && params.value<=40 ){
                      return "#ff8d1a";
                    }else{
                      return "#23a257";
                    }
                  },
                },
            },
        },
    ]
    });
  }
  constructor(public events: Events,public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
    //写数据库中的用户信息表的主体质id
    this.uid = localStorage.getItem("uid");
    this.des = this.navParams.get('des');
  }
  goJisuan(){
    this.inclination=[];
    for(var j=2;j<this.arr.length;j++)
    {
      if(this.arr[j]>=40){
        if(this.main!=1&&this.arr[j]>=this.arr[this.main]){
          this.inclination.push(this.main);
          this.main=j;
        }else if(this.main!=1&&this.arr[j]<this.arr[this.main]){
          this.inclination.push(j);
          this.main=this.main;
        }else if(this.main===1){
          this.main=j;
        }
      }else if(this.arr[0]>=60&&this.arr[1]<40&&this.arr[2]<40&&this.arr[3]<40&&this.arr[4]<40&&this.arr[5]<40&&this.arr[6]<40&&this.arr[7]<40&&this.arr[8]<40&&this.arr[9]<40){
          this.main=1;
          break;
      }else if(this.arr[j]>=30){
        this.inclination.push(j);
      }
    }
    //将主体质写到数据库
    // this.http.post("/api/question/main",{
    //   "bid":this.main,
    //   "uid":this.uid
    // }).subscribe(data=>{
    // });

  }
  //确定倾向的体质
  goRemove(){
    for(var m=0;m<this.inclination.length;m++){
      if(this.inclination[m]===this.main){
        this.inclination.splice(m,1);
      }
    }
  }
  ionViewWillEnter(){
    this.http.post('/api/flag',{
      "uid":this.uid
    }).subscribe(data=>{
      this.flag = data;
      if(this.isEmpty(this.flag)){
        this.flag1=true;
        // console.log('没有测试过');
      }
      else{
        this.flag1=false;
        console.log('测试过');
        this.flag.forEach(e => {
          this.arr=[];
          this.arr.push(e.uid);
          this.arr.push(e.pinghe);
          this.arr.push(e.qixu);
          this.arr.push(e.yangxu);
          this.arr.push(e.yinxu);
          this.arr.push(e.tanshi);
          this.arr.push(e.shire);
          this.arr.push(e.xueyu);
          this.arr.push(e.qiyu);
          this.arr.push(e.tebing);
          this.arr.push(e.uid);
          this.goJisuan();
          this.goChart();
          this.goRemove();
        });
           
          this.http.post('/api/body/main',{
            "uid":this.uid
          }).subscribe(data=>{
            this.body=data[0].bid;
            this.http.get('/api/body').subscribe(data=>{
              this.name=data[this.body-1].bodyName;
              this.explain=data[this.body-1].report;
              this.shape=data[this.body-1].shape.split("%%%");
              this.mentality=data[this.body-1].mentality.split("%%%");
              this.incidence=data[this.body-1].incidence;
              this.medicinalfood=data[this.body-1].medicinalfood.split("%%%");
              this.properdiet=data[this.body-1].properdiet.split("%%%");
              this.unsuitable=data[this.body-1].unsuitable.split("%%%");
              this.living=data[this.body-1].living;
              this.emotion=data[this.body-1].emotion;
            });

        });
        
      }
    });
  }
  
  goBodytest(){
    this.navCtrl.push('BodytestPage',{"des":2});
  }

  //控制页面跳转
  backButtonClick(){
    this.navCtrl.popToRoot();
    this.navCtrl.pop();
  }
  backButtonClick2(){
    this.navCtrl.popToRoot();
  }
  @ViewChild(Navbar) navBar: Navbar;
  ionViewDidLoad(){
    if(this.des==1){
      this.navBar.backButtonClick = this.backButtonClick;
    }else{
      this.navBar.backButtonClick = this.backButtonClick2;
    }
  }
  ionViewDidEnter(){
    this.events.subscribe('ReportPage',()=>{
      this.ionViewWillEnter();
    });
  }
  
}  
