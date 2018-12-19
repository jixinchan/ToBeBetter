import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the HomesearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-homesearch',
  templateUrl: 'homesearch.html',
})
export class HomesearchPage {

  hot = ['平和质','饮食','运动','体质','调理','湿热质','血瘀质','气郁质','特禀质'];
  history;
  uid;
  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient)
  {
    this.uid = localStorage.getItem('uid');

    if(localStorage.getItem(this.uid+'history')===null){
      localStorage.setItem(this.uid+'history','');
    }
  }

  ionViewDidLoad() {}

  ionViewWillEnter(){
    // console.log(1);
    document.querySelectorAll('.box')[0].className += ' hide';
    if(localStorage.getItem(this.uid+'history')){
      document.querySelectorAll('.history')[0].className.slice(0,7);
      this.history = localStorage.getItem(this.uid+'history').split(',');
    }
    else{
      document.querySelectorAll('.history')[0].className += ' hide';
      this.history = [];
    }
  }

  articleResults;
  dynamicResults;
  searchKey(){
    var key = document.querySelector('input').value;
    // 取消搜索
    if(document.querySelector('#btn').querySelector('span').innerHTML === '取消'){
      document.querySelector('input').value = '';
      key = '';
      document.querySelector('#btn').querySelector('span').innerHTML = '搜索';
      document.querySelectorAll('.searchOptions')[0].className = document.querySelectorAll('.searchOptions')[0].className.slice(0,13);
      document.querySelectorAll('.box')[0].className += ' hide';
    }
    else{
      // 搜索内容非空
      if(key){
        // localStorage保存搜索历史
        if(localStorage.getItem(this.uid+'history').indexOf(key) === -1){
          this.history.push(key);
          localStorage.setItem(this.uid+'history',this.history.reverse().toString());
        }
        // 搜索推文
        this.http.post('/api/searchArticle',{
          'key': key
        }).subscribe((data)=>{
          this.articleResults = data;
          // console.log('ar: ',this.articleResults);
          this.articleResults.forEach(e => {
            e.imgs = '../assets/imgs/images/'+e.imgs;
          });
        });
        // 搜索动态
        this.http.post('/api/searchDynamic',{
          'key': key
        }).subscribe((data)=>{
          this.dynamicResults = data;
          // console.log('dr: ',this.dynamicResults);
          this.dynamicResults.forEach(e => {
            e.imgs = '../assets/imgs/download/'+e.imgs;
          });
        });
        document.querySelectorAll('.searchOptions')[0].className += ' hide';
        document.querySelectorAll('.box')[0].className = document.querySelectorAll('.box')[0].className.slice(0,3);
        document.querySelector('#btn').querySelector('span').innerHTML = '取消';
      }
      else{  // 搜索内容为空
        let alert = this.alertCtrl.create({
          title: '请输入搜索内容',
          buttons: ['确定']
        });
        alert.present();
      }
    }
  }

  search(i){
    document.querySelector('input').value = this.hot[i];
    this.searchKey();
  }

  searchHis(msg){
    document.querySelector('input').value = msg;
    this.searchKey();
  }

  delHistory(){
    localStorage.removeItem(this.uid+'history');
    this.ionViewWillEnter();
  }

  delthis(i){
    this.history.splice(i,1);
    localStorage.setItem(this.uid+'history',this.history.reverse().toString());
    this.ionViewWillEnter();
  }

  isActive=0;
  isClick(i){
    this.isActive=i;
  }


}
