import { Component, OnInit,TemplateRef} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  modalRef: BsModalRef;
  data;
  bodyName=[];//体质名称
  pinghe=[];
  qixu=[];
  yangxu=[];
  yinxu=[];
  tanshi=[];
  shire=[];
  xueyu=[];
  qiyu=[];
  tebing=[];
  totalbody=[
    this.pinghe,
    this.qixu,
    this.yangxu,
    this.yinxu,
    this.tanshi,
    this.shire,
    this.xueyu,
    this.qiyu,
    this.tebing,]
  body=["平和质","气虚质","阳虚质","阴虚质","痰湿质","湿热质","血瘀质","气郁质","特禀质"];
  question;
  // fenkai2=[];
  qid;
  editid;
  editquestion;
  addbodyid=1;
  addqid;
  addquestion;
  choicebid=[];
  editqid;
  count=[];
  deleteqid;
  deletebid;
  constructor(public http:HttpClient,private modalService: BsModalService) { }
  // 导航部分
  goTotalbody(){
    this.totalbody.splice(0,this.totalbody.length);
    this.totalbody=[
      this.pinghe=[],
      this.qixu=[],
      this.yangxu=[],
      this.yinxu=[],
      this.tanshi=[],
      this.shire=[],
      this.xueyu=[],
      this.qiyu=[],
      this.tebing=[]
    ];
    this.choicebid=[1,2,3,4,5,6,7,8,9];
    this.http.get('/api/question').subscribe(data=>{
      this.question=data;
      this.question.forEach(e=>{
        switch (e.bid)
        {
        case 1:
          this.pinghe.push(e);
          // console.log(this.pinghe);
          break;
        case 2:
          this.qixu.push(e);
          break;
        case 3:
          this.yangxu.push(e);
          break;
        case 4:
          this.yinxu.push(e);
          break;
        case 5:
          this.tanshi.push(e);
          break;
        case 6:
          this.shire.push(e);
          break;
        case 7:
          this.xueyu.push(e);
          break;
        case 8:
          this.qiyu.push(e);
          break;
        case 9:
          this.tebing.push(e);
          // console.log(this.tebing);
          break;
        }
 
      });
    });
  }
  goSomatoplasm(i){
    this.choicebid[0]=i;
    this.http.post('/api/somatoplasm',{
      "bid":i
    }).subscribe(data=>{
      this.data=data;
      this.totalbody.splice(0,this.totalbody.length);
      this.totalbody[0]=this.data;
    })
  }
// 删除题目
  goDelete(template3: TemplateRef<any>,i){
    // console.log(i);
    this.modalRef = this.modalService.show(template3);
    this.deleteqid=i;
  }
  goYesdelete(){
    this.http.post('/api/delete/question',{
      "qid":this.deleteqid
    }).subscribe(data=>{
        // console.log(i);
    });
    window.location.reload();;
  }
  // 编辑
  openModal(template1: TemplateRef<any>,j) {
    this.modalRef = this.modalService.show(template1);
    this.editid=j;
  }
  confirm(){
    console.log(this.editquestion);
    this.http.post('/api/edit/question',{
      "question":this.editquestion,
      "qid":this.editid,
    }).subscribe(data=>{
        console.log(this.editid);
    });
    window.location.reload();;
    this.modalRef.hide();
  }
  decline(){
    this.modalRef.hide();
  }
  //增加题目
  openModal2(template2: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template2);
  }
  selectOnchang(i){
    this.count.splice(0,this.count.length);
    this.addbodyid=i;
    this.http.get("/api/question").subscribe(data=>{
      this.data=data;
      this.data.forEach(e => {
        this.count.push(e.qid);
      });
    })
    console.log(this.count);
  }
  goAddquestion(){
    var flag=0;
    for(var i=0;i<this.count.length;i++){
      if(this.addqid==this.count[i])
      {
        flag=1;
        console.log("题库中已经有id")
        alert('题库中已经有此ID，请重新输入');
      }
    }
    if(flag===0){
      this.http.post('/api/add/question',{
        "qid":this.addqid,
        "question":this.addquestion,
        "bid":this.addbodyid
      }).subscribe(data=>{
          // console.log("你进来了");
      });
      this.modalRef.hide();
      window.location.reload();;
    }
    
    
  }
  ngOnInit() {
    this.http.get('/api/question').subscribe(data=>{
      this.question=data;
      this.question.forEach(e=>{
        switch (e.bid)
        {
        case 1:
          this.pinghe.push(e);
          // console.log(this.pinghe);
          break;
        case 2:
          this.qixu.push(e);
          break;
        case 3:
          this.yangxu.push(e);
          break;
        case 4:
          this.yinxu.push(e);
          break;
        case 5:
          this.tanshi.push(e);
          break;
        case 6:
          this.shire.push(e);
          break;
        case 7:
          this.xueyu.push(e);
          break;
        case 8:
          this.qiyu.push(e);
          break;
        case 9:
          this.tebing.push(e);
          // console.log(this.tebing);
          break;
        }
 
      });
    });
    this.choicebid=[1,2,3,4,5,6,7,8,9];
    
  }
  // ngDoCheck(){
  //   console.log('改变啦');
  // }
}
