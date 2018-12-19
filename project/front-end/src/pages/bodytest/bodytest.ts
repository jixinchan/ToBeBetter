import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App,ModalController,AlertController} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Events } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-bodytest',
  templateUrl: 'bodytest.html',
})
export class BodytestPage {
  question;
  question0=[];
  qid=[];
  bid=[];
  key=['没有','很少','有时','经常','总是'];
  isActive1=[-1];
  isActive2=0;
  k=0;
  //九种体质：
  pinghe;
  qixu;
  yangxu;
  yinxu;
  tanshi;
  shire;
  xueyu;
  qiyu;
  tebing;
  des;//目标页面
  // 主体质id
  main=1;
  body=[
    {id:1,sum:0,count:0,result:0,bodyname:"平和质"},
    {id:2,sum:0,count:0,result:0,bodyname:"气虚质"},
    {id:3,sum:0,count:0,result:0,bodyname:"阳虚质"},
    {id:4,sum:0,count:0,result:0,bodyname:"阴虚质"},
    {id:5,sum:0,count:0,result:0,bodyname:"痰湿质"},
    {id:6,sum:0,count:0,result:0,bodyname:"湿热质"},
    {id:7,sum:0,count:0,result:0,bodyname:"血瘀质"},
    {id:8,sum:0,count:0,result:0,bodyname:"气郁质"},
    {id:9,sum:0,count:0,result:0,bodyname:"特禀质"}
  ];
  scorearr=[];
  resultarr=[];
  goShare(){
    let profileModal = this.modalCtrl.create('SharePage',{flag:true});
    profileModal.present();
  }
  goChange(i,j){
    //第一次点击之后有背景颜色，再次点击的时候没有
    this.isActive1[i]=j;
    //为了可以修改点过的题的答案所以储存下来。
    if(this.k===0){
      this.scorearr.push({qid:this.question[i].qid,id:this.body[this.question[i].bid-1].id,score:(j+1)});
      this.k=this.k+1;
      // console.log("ssk=0");
      // console.log(this.question[i].qid);
    }else if(this.question[i].qid>this.scorearr.length){
      this.scorearr.push({qid:this.question[i].qid,id:this.body[this.question[i].bid-1].id,score:(j+1)});
      this.k=this.k+1;
      //打印储存的信息
      // console.log(this.k);
      // console.log(this.question[i].qid);
      // console.log(this.scorearr.length);
    }else{
      this.scorearr[this.question[i].qid-1]={qid:this.question[i].qid,id:this.body[this.question[i].bid-1].id,score:(j+1)};
    }
    // console.log(this.scorearr);
  }
  //计算分数+跳转+更改数据库
  goReport(){
    for(var y=0;y<this.scorearr.length;y++){
      this.body[this.scorearr[y].id-1].sum += this.scorearr[y].score;
      this.body[this.scorearr[y].id-1].count++;
      // console.log(this.body[this.scorearr[y].id-1].sum);
    }
    this.resultarr.push(this.uid);
    for(var x=0;x<9;x++){
      this.body[x].result=Math.round(((this.body[x].sum-this.body[x].count)/(this.body[x].count*4))*100);
      this.resultarr.push(this.body[x].result);
      console.log(this.resultarr);
    }
    for(var j=2;j<this.resultarr.length;j++)
    {
      if(this.resultarr[j]>=40){
        if(this.main!=1&&this.resultarr[j]>=this.resultarr[this.main]){
          this.main=j;
          console.log('main1:',this.main);
        }else if(this.main!=1&&this.resultarr[j]<this.resultarr[this.main]){
          this.main=this.main;
          console.log('main2:',this.main);
        }else if(this.main===1){
          this.main=j;
          console.log('main3:',this.main);
        }
      }else if(this.resultarr[0]>=60&&this.resultarr[1]<40&&this.resultarr[2]<40&&this.resultarr[3]<40&&this.resultarr[4]<40&&this.resultarr[5]<40&&this.resultarr[6]<40&&this.resultarr[7]<40&&this.resultarr[8]<40&&this.resultarr[9]<40){
          this.main=1;
          console.log('main4:',this.main);
          break;
      }
    }
    this.http.post("/api/question/main",{
      "bid":this.main,
      "uid":this.uid
    }).subscribe(data=>{
      console.log("bodytest的主要的体质");
      console.log(this.main);
      console.log(data);
    });
    if(this.flag.length===1){
        this.http.post("/api/question2",{
          "pinghe":this.body[0].result,
          "qixu":this.body[1].result,
          "yangxu":this.body[2].result,
          "yinxu":this.body[3].result,
          "tanshi":this.body[4].result,
          "shire":this.body[5].result,
          "xueyu":this.body[6].result,
          "qiyu":this.body[7].result,
          "tebing":this.body[8].result,
          "uid":this.uid
        }).subscribe(data=>{
          // console.log("question2");
          // console.log(data);
        });
    }else{
      this.http.post("/api/question1",{
        "uid":this.uid,
        "pinghe":this.body[0].result,
        "qixu":this.body[1].result,
        "yangxu":this.body[2].result,
        "yinxu":this.body[3].result,
        "tanshi":this.body[4].result,
        "shire":this.body[5].result,
        "xueyu":this.body[6].result,
        "qiyu":this.body[7].result,
        "tebing":this.body[8].result
      }).subscribe(data=>{
      });
    }
    if(this.des==1){
      this.navCtrl.push('ReportPage',{"des":this.des});
    }else{
      this.navCtrl.pop().then(()=>{
        this.events.publish('ReportPage');
      });
    }
     
  }
  uid;
  flag;
  constructor(public modalCtrl: ModalController, public alertCtrl: AlertController,public events: Events,public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
    this.des = this.navParams.get('des');
    // console.log('bodytest:',this.des);
    this.uid = localStorage.getItem("uid");
    this.http.post('/api/flag',{
      "uid":this.uid
    }).subscribe(data=>{
      this.flag=data;
      console.log(data);
    })
  }
  ionViewDidLoad(){
    this.http.get("/api/question").subscribe(data=>{
      this.question=data;
    });
  }
}
    
 