import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  input="";
  history=[];
  hot=['减肥','芒果','草莓','菠萝','山药','枸杞','苹果','红枣','蜂蜜','牛肉'];
  search(){
    if(this.input!=""){
      this.history.push(this.input);
      this.input="";
    }
  }
  clear(){
    this.history=[];
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
  ionViewDidLoad() {
    
  }
}
