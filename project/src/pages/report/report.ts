import { Component,ViewChild,ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

declare var echarts;//设置echarts全局对象

/**
 * Generated class for the ReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  goBodytest(){
    this.navCtrl.push('BodytestPage');
  }
  isEmpty(obj) {
    for(var k in obj){
      return false;  // 非空
    }
    return true;  // 空
  }
  goChart(){
    var data = [this.arr[1],this.arr[2],this.arr[3],this.arr[4],this.arr[5],this.arr[6],this.arr[7],this.arr[8],this.arr[9]];
    var dataAxis = ['平和', '气虚', '阳虚', '阴虚', '痰湿', '湿热', '血瘀', '气郁', '特禀'];
    // var data = [20,30,this.arr[3],this.arr[4],this.arr[5],this.arr[6],this.arr[7],this.arr[8],this.arr[9]];
    var yMax = 100;
    var dataShadow = [];
    for (var i = 0; i < data.length; i++) {
        dataShadow.push(yMax);
    }
    let ctelement = this.container.nativeElement;
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
                fontSize:14,
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
    markLine: {
      data: [
        [
          { name: '标线1起点', xAxis: "平和",  yAxis: 60, symbol: 'circle'},
          { name: '标线1终点', xAxis: '特禀',  yAxis: 60, symbol: 'circle' },
        ],
      ],
      label: {
        normal: {
          show: true,
          position: 'middle',
          formatter: '节能与新能源汽车技术路线图2020年目标',
        },
      },
      lineStyle: {
        normal: {
          type: 'solid',
          color: '#grey',
        },
      },
    },
    series: [
        {
            type: 'bar',
            barWidth: '50%',
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
  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
    //写数据库中的用户信息表的主体质id
    this.uid = localStorage.getItem("uid");
    //获取所有体质的调养方法
    // this.ionViewDidEnter();
    
    
  }
  goJisuan(){
    this.inclination=[];
    for(var j=2;j<this.arr.length;j++)
    {
      if(this.arr[j]>=40){
        if(this.main!=1&&this.arr[j]>=this.arr[this.main]){
          this.inclination.push(this.main);
          this.main=j;
          console.log('主体质1');
          console.log(this.main);
          console.log('偏向的体质1');
          console.log(this.inclination);
        }else if(this.main!=1&&this.arr[j]<this.arr[this.main]){
          this.inclination.push(j);
          this.main=this.main;
          console.log('主体质2');
          console.log(this.main);
        }else if(this.main===1){
          this.main=j;
        }
      }else if(this.arr[0]>=60&&this.arr[1]<40&&this.arr[2]<40&&this.arr[3]<40&&this.arr[4]<40&&this.arr[5]<40&&this.arr[6]<40&&this.arr[7]<40&&this.arr[8]<40&&this.arr[9]<40){
          this.main=1;
          break;
      }else if(this.arr[j]>=30){
        this.inclination.push(j);
        console.log('偏向的体质2');
        console.log(this.inclination);
        console.log('主体质3');
        console.log(this.main);
      }
    }
    this.uid = localStorage.getItem("uid");
    this.http.post("/api/question/main",{
      "bid":this.main,
      "uid":this.uid
    }).subscribe(data=>{
      console.log("bodytest的主要的体质");
      console.log(this.main);
    });
    
  }
  ionViewWillEnter() {  
    this.http.post('/api/flag?num='+Math.random(),{
      "uid":this.uid
    }).subscribe(data=>{
      this.flag = data;
      if(this.isEmpty(this.flag)){
        document.querySelectorAll('.reportbox')[0].className += " hide";
        console.log('没有测试过');
      }
      else{
        document.querySelectorAll('.box')[0].className += " hide";
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
        });
        
      }
    });
    
    



    
    this.http.post('/api/body/main?num='+Math.random(),{
      "uid":this.uid
    }).subscribe(data=>{
      this.body=data[0].bid;
      console.log(this.body);
      this.goChart();
    });
    this.http.get('/api/body?num='+Math.random()).subscribe(data=>{
      // this.ionViewDidEnter();
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
  }
}  
