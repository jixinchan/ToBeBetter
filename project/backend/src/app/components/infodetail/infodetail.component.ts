import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-infodetail',
  templateUrl: './infodetail.component.html',
  styleUrls: ['./infodetail.component.css']
})
export class InfodetailComponent implements OnInit {

  isActive = 0;
  isClick(i) {
    this.isActive = i;
  }

  uid;
  data;
  infomation;
  flag = false;
  class=["健身","饮食","理疗"];
  body=["平和质","气虚质","阳虚质","阴虚质","痰湿质","湿热质","血瘀质","气郁质","特禀质"];

  userid;
  nickname;

  mydynamic;
  dclass=[];//我的动态类别

  cdynamic;
  cdclass=[];//收藏动态类别

  crecommod;
  rbody=[];//推文体质类型
  rclass=[];//推文类别

  attention;
  abody = [];

  fans;
  fbody = [];
  

  constructor(public http:HttpClient,private router:ActivatedRoute) {
    
   }

  ngOnInit() {
    this.uid = this.router.snapshot.params['userid'];
    console.log(this.uid);

    this.http.post('/api/infodetail',{
      "uid":this.uid
    }).subscribe(data=>{
      this.infomation = data;
      console.log(this.infomation);
      if(this.infomation!=undefined){
        this.infomation.forEach(e=>{
          this.userid = e.uid;
          this.nickname = e.nickname;
        });
      }
    });

    this.http.post('/api/infodynamic',{
      "uid": this.uid
    }).subscribe(data=>{
      this.mydynamic=data;
      console.log(this.mydynamic);
      if(this.mydynamic!=undefined){
        this.mydynamic.forEach(e=>{
          this.class.filter((e2,i)=>{
            if(i+1==e.cid){
              this.dclass.push(e2);
            }
          });
        });
      }
    });  
  }

  goSC(){

    this.http.post('/api/infoliked',{
      "uid": this.uid
    }).subscribe(data=>{
      this.cdynamic=data;
      console.log(this.cdynamic);
      if(this.cdynamic!=undefined){
        this.cdynamic.forEach(e=>{
          this.class.filter((e2,i)=>{
            if(i+1==e.cid){
              this.cdclass.push(e2);
            }
          });
        });
      }
    });
    this.http.post('/api/infoliker',{
      "uid": this.uid
    }).subscribe(data=>{
      this.crecommod=data;
      console.log(this.crecommod);
      if(this.crecommod!=undefined){
        this.crecommod.forEach(e=>{
          this.body.filter((e2,i)=>{
            if(i+1==e.bid){
              this.rbody.push(e2);
            }
          });
          this.class.filter((e2,i)=>{
            if(i+1==e.cid){
              this.rclass.push(e2);
            }
          });
        });
      }
    });
  }

  goGZ(){
    this.http.post('/api/infoattention',{
      "uid": this.uid
    }).subscribe(data=>{
      console.log(data);
      this.attention=data;
      console.log(this.attention);
      if(this.attention!=undefined){
        this.attention.forEach(e=>{
          this.body.filter((e2,i)=>{
            if(i+1==e.bid){
              this.abody.push(e2);
            }
          });
        });
      }
    });
  }

  goFS(){
    this.http.post('/api/infofans',{
      "uid": this.uid
    }).subscribe(data=>{
      console.log(data);
      this.fans=data;
      console.log(this.fans);
      if(this.fans!=undefined){
        this.fans.forEach(e=>{
          this.body.filter((e2,i)=>{
            if(i+1==e.bid){
              this.fbody.push(e2);
            }
          });
        });
      }
    });
  }

  //删除我的动态
  delMD(did){
    this.http.post('/api/delmd',{
      "did":did
    }).subscribe((data)=>{
      window.location.reload();
    });
  }
  
  //删除收藏动态
  delCD(did){
    this.http.post('/api/delcd',{
      "uid":this.uid,
      "did":did
    }).subscribe((data)=>{   
      window.location.reload();
    })
  }
  //删除收藏推文
  delCR(rid){
    this.http.post('/api/delcr',{
      "uid":this.uid,
      "rid":rid
    }).subscribe((data)=>{
      window.location.reload();
    })
  }

  //删除关注
  delAT(aid){
    this.http.post('/api/delat',{
      "uid":this.uid,
      "aid":aid
    }).subscribe((data)=>{
      window.location.reload();
    })
  }

  //删除粉丝
  delFA(auid){
    this.http.post('/api/delat',{
      "uid":auid,
      "aid":this.uid
    }).subscribe((data)=>{
      window.location.reload();
    })
  }
}
