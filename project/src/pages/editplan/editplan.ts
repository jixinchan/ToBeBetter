import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { PlanPage } from '../plan/plan';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the EditplanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editplan',
  templateUrl: 'editplan.html',
})
export class EditplanPage {

  plan;
  uid;
  constructor(public navCtrl: NavController, public navParams: NavParams,public App:App,public http:HttpClient) {
    this.uid = localStorage.getItem("uid");
    this.http.get('/api/plan').subscribe(data=>{
      // console.log(data);
      this.plan = data;
    });
  }

  ionViewDidLoad() {
  }


  save(){
    var pid = document.querySelectorAll('.pid')[0].innerHTML;
    this.http.post('/api/saveplan',{
      "uid":this.uid,
      "pid":pid
    }).subscribe(data=>{});
    
    this.navCtrl.pop();
  }

  changePlan(color,txt,pid){
    document.querySelectorAll('.pic')[0].className = "pic";
    var addcolor = document.querySelectorAll('.pic')[0].className;  // 自定义图和背景

    document.querySelectorAll('.pic')[0].className = addcolor + " " + color;
    document.querySelectorAll('.txt')[0].innerHTML = txt;  // 修改计划文字

    // pid
    document.querySelectorAll('.pid')[0].innerHTML = pid;
  }

  quxiao(){
    document.querySelectorAll('.pic')[0].className = "pic";
    document.querySelectorAll('.pic')[0].querySelector('use').attributes[0].value = "#icon-shuiguo";
    document.querySelectorAll('.txt')[0].innerHTML = "添加计划";
  }



}
