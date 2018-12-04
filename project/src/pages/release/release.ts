import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ReleasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-release',
  templateUrl: 'release.html',
})
export class ReleasePage {
  i=1;
  items=[0];
  add(){
    if(this.i<9){
      this.items.push(this.i++);
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
  }
}
