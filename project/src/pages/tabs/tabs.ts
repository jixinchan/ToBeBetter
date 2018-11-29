import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { MePage } from '../me/me';
import { PlanPage } from '../plan/plan';
import { NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PlanPage;
  tab3Root = ContactPage;
  tab4Root = MePage;
  account;
  constructor(public params:NavParams) {
    this.account=this.params.get('account');
    console.log('tabs参数:',this.params.get('account'));
  }
}
