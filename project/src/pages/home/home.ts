import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  isActive=0;
  isClick(i){
    this.isActive=i;
  }

  goarticle(){
    this.navCtrl.push('HometailPage');
  }
  
  arr=['推荐','健身','饮食','理疗'];
  constructor(public navCtrl: NavController) {

  }

}
