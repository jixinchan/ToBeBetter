import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-recommend',
    templateUrl: './recommend.component.html',
    styleUrls: ['./recommend.component.css']
})
export class RecommendComponent implements OnInit {
    num;
    orderBy = 'desc';
    data;
    bid = 1;
    rid = [];//推文ID
    bodyName = [];//体质名称
    title = [];//推文标题
    content = [];//推文内容
    img = [];//推文图片
    className = [];//推文类别
    class = ["健身", "饮食", "理疗"];
    body = ["所有体质", "平和质", "气虚质", "阳虚质", "阴虚质", "痰湿质", "湿热质", "血瘀质", "气郁质", "特禀质"];
    fresh() {
        this.rid = [];
        this.bodyName = [];
        this.title = [];
        this.content = [];
        this.img = [];
        this.className = [];
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
            this.http.post('/api/recommend/select', {
                'bid': this.bid
            }).subscribe(data => {
                this.rid = [];
                this.bodyName = [];
                this.title = [];
                this.content = [];
                this.img = [];
                this.className = [];
                this.do(data);
            });
        }
    }
    del(rid) {
        // alert(rid);
        var result = confirm("请问您确定要删除该推荐吗？");
        if (result == true) {
            // console.log("确定");
            this.http.post('/api/recommend', {
                'rid': rid
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
                this.rid.push(e.rid);
                this.body.filter((e2, i) => {
                    if (i == e.bid) {
                        this.bodyName.push(e2);
                    }
                });
                this.title.push(e.title);
                this.content.push(e.content);
                this.img.push(e.imgs);
                this.class.filter((e2, i) => {
                    if (i + 1 == e.cid) {
                        this.className.push(e2);
                    }
                });
            });
        }
        this.num = this.rid.length;
    }

    constructor(public http: HttpClient, private router: ActivatedRoute) {
    }
    ngOnInit() {
        this.http.get('/api/recommend/' + this.orderBy).subscribe(data => {
            // console.log(data);
            this.do(data);
        });
    }
}
