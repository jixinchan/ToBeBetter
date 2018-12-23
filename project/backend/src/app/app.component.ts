import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'freshBack';
  isLogin=localStorage.getItem('isLogin')=='true'?true:false;
  ngOnInit(){
    this.isLogin=localStorage.getItem('isLogin')=='true'?true:false;
  }
}
