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
  constructor(public params: NavParams,public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
    this.score = params.data;
    console.log(this.score);
    this.uid = localStorage.getItem("uid");
    for(var i in this.score){
      this.arr.push(this.score[i]);
      console.log(this.score[i]);
    }
    console.log("arr的长度");
    console.log(this.arr.length);
    for(var j=2;j<this.arr.length;j++)
    {
      if(this.arr[j]>=40){
        if(this.main!=1&&this.arr[j]>=this.arr[this.main]){
          this.inclination.push(this.main);
          this.main=j;
          // console.log('主体质1');
          // console.log(this.main);
          // console.log('偏向的体质1');
          // console.log(this.inclination);
        }else if(this.main!=1&&this.arr[j]<this.arr[this.main]){
          this.inclination.push(j);
          this.main=this.main;
          // console.log('主体质2');
          // console.log(this.main);
        }else if(this.main===1){
          this.main=j;
        }
      }else if(this.arr[0]>=60&&this.arr[1]<40&&this.arr[2]<40&&this.arr[3]<40&&this.arr[4]<40&&this.arr[5]<40&&this.arr[6]<40&&this.arr[7]<40&&this.arr[8]<40&&this.arr[9]<40){
          this.main=1;
          break;
      }else if(this.arr[j]>=30){
        this.inclination.push(j);
        // console.log('偏向的体质2');
        // console.log(this.inclination);
        // console.log('主体质3');
        // console.log(this.main);
      }
    }
    
    //写数据库中的用户信息表的主体质id
    this.uid = localStorage.getItem("uid");
    this.http.post("/api/question/main",{
      "bid":this.main,
      "uid":this.uid
    }).subscribe(data=>{
    });
    this.http.get('/api/body').subscribe(data=>{
      this.explain=data[this.main-1].report;
      this.shape=data[this.main-1].shape.split("%%%");
      this.mentality=data[this.main-1].mentality.split("%%%");
      this.incidence=data[this.main-1].incidence;
      this.medicinalfood=data[this.main-1].medicinalfood.split("%%%");
      this.properdiet=data[this.main-1].properdiet.split("%%%");
      this.unsuitable=data[this.main-1].unsuitable.split("%%%");
      this.living=data[this.main-1].living;
      this.emotion=data[this.main-1].emotion;
    });
    

  }

  ionViewDidLoad() {
    var dataAxis = ['平和', '气虚', '阳虚', '阴虚', '痰湿', '湿热', '血瘀', '气郁', '特禀'];
    var data = [this.score.pinghe,this.score.qixu,this.score.yangxu,this.score.yinxu,this.score.tanshi,this.score.shire,this.score.xueyu,this.score.qiyu,this.score.tebing];
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
    
    this.http.post('/api/body/main',{
      "uid":this.uid
    }).subscribe(data=>{
      this.body=data[0].bid;
    });

    
  }
}  
