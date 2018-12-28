import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  obj;
  data;
  flag;
  temp;
  rid;
  bodyName;//体质名称
  title;//推文标题
  content;//推文内容
  img;//推文图片
  className;//推文类别
  bid = 1;
  cid = 1;//传值
  class = ["健身", "饮食", "理疗"];
  body = ["平和质", "气虚质", "阳虚质", "阴虚质", "痰湿质", "湿热质", "血瘀质", "气郁质", "特禀质"];
  get(val) {
    // console.log(val);
    this.body.filter((e, i) => {
      if (e == val) {
        this.bid = (++i);
      }
    });
    // console.log(this.bid);
  }
  get2(val) {
    this.class.filter((e, i) => {
      if (e == val) {
        this.cid = (++i);
      }
    });
    // console.log(this.cid);
  }
  change() {
    this.obj = {
      'bid': this.bid,
      'content': this.content,
      'imgs': this.img,
      'cid': this.cid,
      'title': this.title,
      'rid': this.rid
    };
    var result = confirm("请问是否保存这个推荐？");
    if (result == true) {
      // console.log("确定");
      // console.log(this.obj);
      if (this.temp == 0) {
        this.http.post('/api/recommend/confirm/insert', this.obj).subscribe(data => { });
      } else {
        this.http.post('/api/recommend/confirm/update', this.obj).subscribe(data => { });
      }
      this.route.navigate(['recommend']);
    } else {
      // console.log("取消");
      this.route.navigate(['recommend']);
    }
  }
  cancel() {
    var result = confirm("确认是否不再修改？");
    if (result == true) {
      // console.log("确定");
      this.route.navigate(['recommend']);
    } else {
      console.log("取消");
    }
  }

  constructor(private router: ActivatedRoute, private http: HttpClient, private route: Router) { }
  ngOnInit() {
    this.router.params.subscribe((params) => {//监听，实时变化->订阅者模式
      this.temp = this.rid = params['rid'];
    });
    if (this.rid == 0) {
      this.flag = false;
      this.rid = "";
    } else {
      this.flag = true;

      this.http.post('/api/recommend/confirm', {
        'rid': this.rid
      }).subscribe(data => {
        // console.log(data);
        this.data = data;

        this.bid = this.data[0].bid;
        this.cid = this.data[0].cid;
        this.body.filter((e2, i) => {
          if (i + 1 == this.data[0].bid) {
            this.bodyName = e2;
          }
        });
        this.title = this.data[0].title;
        this.content = this.data[0].content;
        this.content = String(this.content).replace(/%%%/g, '\n\n');
        this.img = this.data[0].imgs;
        this.class.filter((e2, i) => {
          if (i + 1 == this.data[0].cid) {
            this.className = e2;
          }
        });
        // console.log(this.bodyName,this.title,this.content,this.img,this.class);
      });
    }
  }
}
