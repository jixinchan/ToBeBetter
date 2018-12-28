import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  data;
  flag;
  temp;
  sid;
  bodyName;//体质名称  
  bid = 1;
  should;
  avoid;
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
  change() {
    var obj = {
      'should': this.should,
      'avoid': this.avoid,
      'bid': this.bid,
      'sid': this.sid
    };
    var result = confirm("确认是否修改这个推文？");
    if (result == true) {
      // console.log("确定");
      // console.log(obj);
      if (this.temp == 0) {
        this.http.post('/api/shoulds/manage/insert', obj).subscribe(data => { });
      } else {
        this.http.post('/api/shoulds/manage/update', obj).subscribe(data => { });
      }
      this.route.navigate(['shoulds']);
    } else {
      // console.log("取消");
      this.route.navigate(['shoulds']);
    }
  }
  cancel() {
    var result = confirm("确认是否不再修改？");
    if (result == true) {
      // console.log("确定");
      this.route.navigate(['shoulds']);
    } else {
      // console.log("取消");
    }
  }

  constructor(private router: ActivatedRoute, private http: HttpClient, private route: Router) { }
  ngOnInit() {
    this.router.params.subscribe((params) => {//监听，实时变化->订阅者模式
      this.temp = this.sid = params['sid'];
    });
    if (this.sid == 0) {
      this.flag = false;
      this.sid = "";
    } else {
      this.flag = true;

      this.http.post('/api/shoulds/manage', {
        'sid': this.sid
      }).subscribe(data => {
        // console.log(data);
        this.data = data;

        this.bid = this.data[0].bid;
        this.should = this.data[0].should;
        this.avoid = this.data[0].avoid;
        this.body.filter((e2, i) => {
          if (i + 1 == this.data[0].bid) {
            this.bodyName = e2;
          }
        });
      });
    }
  }
}
