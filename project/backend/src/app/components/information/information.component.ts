import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {

  constructor(private http: HttpClient) { }

  userinfo;
  ngOnInit() {
      this.http.get('/api/userinfo').subscribe(data=>{
      this.userinfo = data;
      this.userinfo.forEach(e => {
        e.birth = moment(e.birth).format("YYYY-MM-DD");
      });
    })
  }

  isdel(uid){
    var a = confirm('要删除这个用户吗？');
    if(a){
      this.delthis(uid);
    }
    else{}
  }

  delthis(uid){
    this.http.post('/api/deluser',{
      "uid":uid
    }).subscribe((data)=>{
      window.location.reload();
    });
  }

  searchresults;
  search(){
    var key = document.querySelector('#text').value;
    console.log(key);
    if(key === ''){
      alert('请输入搜索关键字');
    }
    else{
      this.http.post('/api/searchusr',{
        "key":key
      }).subscribe(data=>{
        this.searchresults = data;
        if(document.querySelectorAll('.now')[0].className.indexOf(' hide') == -1){
          document.querySelectorAll('.now')[0].className += ' hide';
        }
      });
    }
  }

  reload(){
    window.location.reload();
  }

}
