import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private http: HttpClient) { }

  usercount;
  dcount;
  ngOnInit() {
    this.http.get('/api/home/usercount').subscribe(data=>{
      this.usercount = data;
    });
    this.http.get('/api/home/dcount').subscribe(data=>{
      this.dcount = data;
    });
  }

}
