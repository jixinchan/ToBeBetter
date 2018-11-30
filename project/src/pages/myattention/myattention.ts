import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MyattentionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-myattention',
  templateUrl: 'myattention.html',
})
export class MyattentionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyattentionPage');
  }
  check=true;
  show(){
  
    if(this.check) {
      document.getElementById('isshow1').style.display='none';
      document.getElementById('isshow').style.display='block';
    }
    else{
      document.getElementById('isshow').style.display='none';
      document.getElementById('isshow1').style.display='block';
    }

    this.check=!this.check;
  }
}
