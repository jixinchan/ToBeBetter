import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-bodytest',
  templateUrl: 'bodytest.html',
})
export class BodytestPage {
  question;
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
  // 主体质id
  main=0;
  //倾向的体质
  inclination=[];
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
  goChange(i,j){
    //第一次点击之后有背景颜色，再次点击的时候没有
    // if(this.isActive1[i]==j){
    //   this.isActive1[i] = -1
    // }else{
    //   this.isActive1[i]=j;
    // }
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
    this.body[this.question[i].bid-1].sum =this.body[this.question[i].bid-1].sum+this.scorearr[this.question[i].qid-1].score;
    console.log(this.body[this.question[i].bid-1].sum);
    this.body[this.question[i].bid-1].count++;
  }
  //计算分数+跳转+更改数据库
  goReport(){
    for(var x=0;x<9;x++){
      this.body[x].result=Math.round(((this.body[x].sum-this.body[x].count)/(this.body[x].count*4))*100);
      this.resultarr.push(this.body[x].result);
      // console.log("resultarr的长度");
      // console.log(this.resultarr);
    }
    // for(var y=0;y<9;y++){
    //   if(this.body[y].result!=undefined){
    //     for(var j=1;j<this.body.length;j++)
    //     {
    //       if(this.body[j].result>=40){
    //         if(this.main!=0&&this.body[j].result>=this.body[this.main].result){
    //           this.inclination.push(this.main);
    //           this.main=j+1;
    //           console.log('主体质1');
    //           console.log(this.main);
    //           console.log('偏向的体质1');
    //         }else if(this.main!=0&&this.body[j].result<this.body[this.main].result){
    //           this.inclination.push(j+1);
    //           this.main=this.main;
    //           console.log('主体质2');
    //           console.log(this.main);
    //         }else if(this.main===0){
    //           this.main=j+1;
    //         }
    //       }else if(this.body[0].result>=60&&this.body[1].result<40&&this.body[2].result<40&&this.body[3].result<40&&this.body[4].result<40&&this.body[5].result<40&&this.body[6].result<40&&this.body[7].result<40&&this.body[8].result<40){
    //           this.main=1;
    //           break;
    //       }else if(this.body[j].result>=30){
    //         this.inclination.push(j+1);
    //         console.log('偏向的体质2');
    //         console.log(this.inclination);
    //         console.log('主体质3');
    //         console.log(this.main);
    //       }
    //     }
    //   }
    // }
    if(this.flag.length===1){
        this.http.post("/api/question2",{
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
          // this.question=data;
          // console.log("question2");
        });
    }else{
      this.http.post("/api/question",{
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
        // this.question=data;
        // console.log(this.question);
      });
    }
    // //写数据库
    // this.http.post("/api/question/main",{
    //   "uid":this.uid,
    //   "bid":this.main
    // }).subscribe(data=>{
    //   // this.question=data;
    //   // console.log(this.question);
    // });


    this.navCtrl.push('ReportPage',{
      uid:this.uid,
        pinghe:this.body[0].result,
        qixu:this.body[1].result,
        yangxu:this.body[2].result,
        yinxu:this.body[3].result,
        tanshi:this.body[4].result,
        shire:this.body[5].result,
        xueyu:this.body[6].result,
        qiyu:this.body[7].result,
        tebing:this.body[8].result
    });
  }
  uid;
  flag;
  constructor(public http:HttpClient,public navCtrl: NavController, public navParams: NavParams) {
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
    // console.log(this.question);
  });
  }
}
    
 