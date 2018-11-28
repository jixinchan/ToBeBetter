import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MylikesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mylikes',
  templateUrl: 'mylikes.html',
})
export class MylikesPage {
  content=[{img:"../assets/imgs/milk.jpg",content:"养生，动词也，亦可为名词。原指道家通过各种方法颐养生命、增强体质、预防疾病，从而达到延年益寿的一种医事活动。",date:"2018年10月20日",time:"15:11"},
{img:"../assets/imgs/muer.jpg",content:"养生，动词也，亦可为名词。原指道家通过各种方法颐养生命、增强体质、预防疾病，从而达到延年益寿的一种医事活动。",date:"2018年10月20日",time:"15:11"},
{img:"../assets/imgs/hetao.jpg",content:"养生，动词也，亦可为名词。原指道家通过各种方法颐养生命、增强体质、预防疾病，从而达到延年益寿的一种医事活动。",date:"2018年10月20日",time:"15:11"},
{img:"../assets/imgs/zao.jpg",content:"养生，动词也，亦可为名词。原指道家通过各种方法颐养生命、增强体质、预防疾病，从而达到延年益寿的一种医事活动。",date:"2018年10月20日",time:"15:11"}]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
