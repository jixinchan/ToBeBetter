import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
//   content=[{img:"../assets/imgs/milk.jpg",content:"牛奶含有很多人体需要的营养成分，是人们常喝的饮品之一。那么喝牛奶的最佳时间是什么时候呢？专家指出，晚上喝牛奶比较好。",love:17},
// {img:"../assets/imgs/muer.jpg",content:"木耳，别名黑木耳、木菌、光木耳。真菌的一种。木耳中含有丰富的纤维素和一种特殊的植物胶原，这两种物质能够促进胃肠蠕动，促进肠道脂肪食物的排泄、减少食物中脂肪的吸收，从而防止肥胖。",love:10},
// {img:"../assets/imgs/hetao.jpg",content:"核桃是很多人都喜爱吃的，核桃仁的营养价值很高，而且对人体各方面，都是这样很好的帮助作用，所以选择它是一个放心之选",love:29},
// {img:"../assets/imgs/zao.jpg",content:"枣能提高人体免疫力，并可抑制癌细胞，药理研究发现，红枣能促进白细胞的生成，降低血清胆固醇，提高血清白蛋白，保护肝脏，红枣中还含有抑制癌细胞，甚至可使癌细胞向正常细胞转化的物质",love:24},
// {img:"../assets/imgs/xueli.jpg",content:"雪梨是凉性的水果，胃寒的人是不能够吃的，如果是手脚冰凉，腹痛宫寒的人群尽量也不要吃雪梨，不管是健康人或胃寒的人群，都应该适当慎重选择雪梨。",love:32},
// {img:"../assets/imgs/egg.jpg",content:"鸡蛋如果没有完全熟透，未熟的蛋黄隔夜之后食用，在保存不当的情形下，营养的东西容易滋生细菌，因此会有害健康",love:23}];
  content;
  love=[10,23,17,19,32,12];
  goContactail(i){
    this.navCtrl.push('ContactailPage',{index:i});
    // console.log(i);
  }

  constructor(public navCtrl: NavController,public http:HttpClient) {
  }
  ionViewDidLoad(){//"http://10.7.86.67:8080/contact"
    this.http.get("http://192.168.0.109:8080/contact").subscribe(data=>{
      this.content=data;
      //console.log(data);
      this.content.forEach(e=>{
        e.imgs="../assets/imgs/"+e.imgs;
      });
    });
  }
}
