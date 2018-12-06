import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { convertDataToISO } from 'ionic-angular/umd/util/datetime-util';

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

  uid;
  constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpClient) {    
    this.uid = localStorage.getItem('uid');
  }
  ionViewDidLoad() {}

  myplan;
  ionViewDidEnter(){    
    this.http.get('/api/userplan').subscribe(data=>{
      console.log(data);
      this.myplan = data;
    });
  }

  addFirst(){
    this.navCtrl.push("EditplanPage");
  }

}
