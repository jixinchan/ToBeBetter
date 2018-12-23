import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public http:HttpClient,public route:Router) { }

  usr;
  pwd;

  exist=true;
  wrong=true;
  ngOnInit() {
    
  }

  login(){
    this.http.post('/api/login',{
      "username":this.usr
    }).subscribe(data=>{
      // console.log('data:',data);
      if(!data[0]){this.exist=false;this.wrong=true;}
      else if(data[0].password!=this.pwd){this.wrong=false;this.exist=true;}
      else{this.wrong=true;this.exist=true;
        localStorage.setItem('isLogin','true');
        this.route.navigateByUrl('/home');
      }
    });
  }
}
