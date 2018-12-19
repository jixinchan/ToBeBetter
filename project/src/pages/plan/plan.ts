import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { convertDataToISO } from 'ionic-angular/umd/util/datetime-util';
import { QuickloginProvider } from '../../providers/quicklogin/quicklogin';

/**
 * Generated class for the PlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-plan',
  templateUrl: 'plan.html',
})
export class PlanPage {
  //游客
  uid;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public http: HttpClient,public app:App, public quicklogin:QuickloginProvider) {
    //游客
    this.uid = localStorage.getItem('uid');
  }
  ionViewDidLoad() { }

  isEmpty(obj) {
    for (var k in obj) {
      return false;  // 非空
    }
    return true;  // 空
  }

  myplan;
  finishes = [];
  status;
  ionViewDidEnter() {
    this.http.post('/api/plan/userplan',{"uid":this.uid}).subscribe(data => {
      this.myplan = data;
      if (this.isEmpty(this.myplan)) {  // 未添加计划
        document.querySelectorAll('.box')[0].className = document.querySelectorAll('.box')[0].className.slice(0, 3);
        document.querySelectorAll('.planbox')[0].className += " hide";
      }
      else {   // 已添加计划
        document.querySelectorAll('.planbox')[0].className = document.querySelectorAll('.planbox')[0].className.slice(0,7);
        document.querySelectorAll('.box')[0].className += " hide";
        this.myplan.forEach(e => {
          this.http.post('/api/plan/getStatus',{
            "uid":this.uid,
            "pid":e.pid
          }).subscribe((data1)=>{
            this.status = data1;
            this.status.forEach(ele=>{
              // console.log(ele.status);
              // console.log(document.querySelectorAll('.p'+e.pid)[0].className);
              if(ele.status == 1){
                document.querySelectorAll('.p'+e.pid)[0].className += " finish finishimg";
                // console.log(document.querySelectorAll('.p'+e.pid)[0].className);
              }
            })
          })
        });
      }
      
    });
  }

  addPlan() {
    //游客
    if(this.uid==1){
      this.quicklogin.quickLogin();
    }else{
      this.navCtrl.push("EditplanPage");
    }    
  }

  changeStatus(pid,status){
    this.http.post('/api/plan/changeStatus',{
      "status":status,
      "uid":this.uid,
      "pid":pid  
    }).subscribe(()=>{});
  }
  isFinish(pid) {
    var p = document.querySelectorAll(".p" + pid)[0].className;
    if (p.indexOf(' finish finishimg') !== -1) {    // 完成-->未完成
      document.querySelectorAll(".p" + pid)[0].className = document.querySelectorAll(".p" + pid)[0].className.slice(0,8);
      console.log('11111111',document.querySelectorAll(".p" + pid)[0].className);
      this.changeStatus(pid,0);
    }
    else {    // 未完成-->完成
      document.querySelectorAll(".p" + pid)[0].className += " finish finishimg";
      console.log('22222222',document.querySelectorAll(".p" + pid)[0].className);
      this.changeStatus(pid,1);
    }
  }
  delPlan(pid) {
    this.http.post('/api/plan/delplan', {
      "uid":this.uid,
      "pid": pid
    }).subscribe(() => {});
    this.ionViewDidEnter();
  }

}
