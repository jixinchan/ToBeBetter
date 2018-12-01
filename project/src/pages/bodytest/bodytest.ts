import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App} from 'ionic-angular';
import { NgStyle } from '@angular/common';

/**
 * Generated class for the BodytestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bodytest',
  templateUrl: 'bodytest.html',
})
export class BodytestPage {

  // question=[
  //   {ID:1,ques:'您比一般人耐受不了寒冷(冬天的寒冷,夏天的冷空调、电扇等)吗?',key:['没有','很少','有时','经常','总是'],},
  //   {ID:2,ques:'您比一般人耐受不了寒冷(冬天的寒冷,夏天的冷空调、电扇等)吗?',key:['没有','很少','有时','经常','总是'],},
  //   {ID:3,ques:'您比一般人耐受不了寒冷(冬天的寒冷,夏天的冷空调、电扇等)吗?',key:['没有','很少','有时','经常','总是'],},
  //   {ID:4,ques:'您比一般人耐受不了寒冷(冬天的寒冷,夏天的冷空调、电扇等)吗?',key:['没有','很少','有时','经常','总是'],},
  //   {ID:5,ques:'您比一般人耐受不了寒冷(冬天的寒冷,夏天的冷空调、电扇等)吗?',key:['没有','很少','有时','经常','总是'],},
  //   {ID:6,ques:'您比一般人耐受不了寒冷(冬天的寒冷,夏天的冷空调、电扇等)吗?',key:['没有','很少','有时','经常','总是'],},
  //   {ID:7,ques:'您比一般人耐受不了寒冷(冬天的寒冷,夏天的冷空调、电扇等)吗?',key:['没有','很少','有时','经常','总是'],}
  // ]
  question=['1.您比一般人耐受不了寒冷(冬天的寒冷,夏天的冷空调、电扇等)吗?',
  '2.您容易忘事(健忘)吗?',
  '3.您容易头晕或站起时晕眩吗?','您面色晦黯或容易出现褐斑吗？',
  '4.您容易感到害怕或收到惊吓吗？',
  '5.您有因季节变化、温度变化或异味等原因而咳喘的现象吗？',
  '6.您的皮肤一抓就红，并出现抓痕吗？'];

  key=['没有','很少','有时','经常','总是'];
  isActive1=[-1,-1,-1,-1,-1,-1];
  isActive2=0;
  // goChange(i,j){
  //   this.isActive1=i;
  //   this.isActive2=j;
  // }
  goDisplay(i){
    this.isActive1=i;
  }
  goChange(i,j){
    // if(this.isActive1[i]==j){
    //   this.isActive1[i] = -1
    // }else{
    //   this.isActive1[i]=j;
    // }
    this.isActive1[i]=j;

  }
 

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
    // console.log('ionViewDidLoad BodytestPage');
  }

}
