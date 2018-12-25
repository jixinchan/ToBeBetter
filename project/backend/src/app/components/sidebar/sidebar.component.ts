import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    document.querySelectorAll('.systemlist')[0].className += ' hide';
    document.querySelectorAll('.userlist')[0].className += ' hide';
  }

  show(name){
    if(document.querySelectorAll('.'+name)[0].className.indexOf(' hide')==-1){
      document.querySelectorAll('.'+name)[0].className += ' hide';
    }
    else{
      if(name==="userlist"){
        document.querySelectorAll('.'+name)[0].className = document.querySelectorAll('.'+name)[0].className.slice(0,8);
      }
      else{
        document.querySelectorAll('.'+name)[0].className = document.querySelectorAll('.'+name)[0].className.slice(0,10);
      }
    }
  }

  choose(num){
    for(var i=1;i<8;i++){
      // console.log(i);
      if(num==i){
        document.querySelectorAll('.hh'+i)[0].className += ' choose';
      }
      else{
        document.querySelectorAll('.hh'+i)[0].className = document.querySelectorAll('.hh'+i)[0].className.slice(0,3)
        // console.log(document.querySelectorAll('.h'+i)[0].className);
      }
    }
  }

}
