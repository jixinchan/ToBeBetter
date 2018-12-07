import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { containerRefreshEnd } from '@angular/core/src/render3/instructions';

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

  // uid;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient) {    
    // this.uid = localStorage.getItem('uid');
  }
  ionViewDidLoad() {}

  isEmpty(obj) {
    for(var k in obj){
      return false;  // 非空
    }
    return true;  // 空
  }

  myplan;
  ionViewDidEnter(){
    this.http.get('/api/userplan').subscribe(data=>{
      this.myplan = data;
      if(this.isEmpty(this.myplan)){
        document.querySelectorAll('.box')[0].className = document.querySelectorAll('.box')[0].className.slice(0,3);
        document.querySelectorAll('.planbox')[0].className += " hide";
      }
      else{
        document.querySelectorAll('.planbox')[0].className = document.querySelectorAll('.planbox')[0].className.slice(0,7);
        document.querySelectorAll('.box')[0].className += " hide";
      }
    });
  }

  addPlan(){
    this.navCtrl.push("EditplanPage");
  }

  isFinish(i){
    var p = document.querySelectorAll(".p"+i)[0].className;
    if(p.indexOf(' finish finishimg') !== -1){
      document.querySelectorAll(".p"+i)[0].className = document.querySelectorAll(".p"+i)[0].className.replace(" finish finishimg","");
    }else{
      document.querySelectorAll(".p"+i)[0].className += " finish finishimg";
    }    
  }
  delPlan(i){
    this.http.post('/api/delplan',{
      "pid":i
    }).subscribe(()=>{
      this.ionViewDidEnter();
    });
  }

}
