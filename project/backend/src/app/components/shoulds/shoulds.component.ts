import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shoulds',
  templateUrl: './shoulds.component.html',
  styleUrls: ['./shoulds.component.css']
})
export class ShouldsComponent implements OnInit {
  num;
  orderBy = 'desc';
  bid;
  data;
  sid = [];//宜忌ID
  bodyName = [];//体质名称
  should = [];//宜
  avoid = [];//忌
  body = ["所有体质", "平和质", "气虚质", "阳虚质", "阴虚质", "痰湿质", "湿热质", "血瘀质", "气郁质", "特禀质"];
  fresh() {
    this.sid = [];
    this.bodyName = [];
    this.should = [];
    this.avoid = [];
    this.ngOnInit();
  }
  order() {
    if (this.orderBy == 'desc') {
      this.orderBy = 'asc';
      this.fresh();
    } else {
      this.orderBy = 'desc';
      this.fresh();
    }
  }
  get(val) {
    this.body.filter((e, i) => {
      if (e == val) {
        this.bid = (i);
      }
    });
    // console.log(this.bid);
    if (this.bid == 0) {
      this.fresh();
    } else {
      this.http.post('/api/shoulds/select', {
        'bid': this.bid
      }).subscribe(data => {
        this.sid = [];
        this.bodyName = [];
        this.should = [];
        this.avoid = [];
        this.do(data);
      });
    }
  }
  del(sid) {
    // alert(sid);
    var result = confirm("确认是否删除？");
    if (result == true) {
      // console.log("确定");
      this.http.post('/api/shoulds', {
        'sid': sid
      }).subscribe(data => { });
      alert("删除成功");
      this.fresh();
    } else {
      console.log("取消");
    }
  }
  do(data) {
    this.data = data;
    if (this.data != undefined) {
      this.data.forEach(e => {
        this.sid.push(e.sid);
        this.body.filter((e2, i) => {
          if (i == e.bid) {
            this.bodyName.push(e2);
          }
        });
        this.should.push(e.should);
        this.avoid.push(e.avoid);
      });
    }
    this.num = this.sid.length;
  }

  constructor(public http: HttpClient) { }
  ngOnInit() {
    this.http.get('/api/shoulds/'+ this.orderBy).subscribe(data => {
      // console.log(data);
      this.do(data);
    });
  }
}
