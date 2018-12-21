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

  delthis(uid){
    this.http.post('/api/deluser',{
      "uid":uid
    }).subscribe((data)=>{
      window.location.reload();
    });
  }

  search(){
    
  }

}
