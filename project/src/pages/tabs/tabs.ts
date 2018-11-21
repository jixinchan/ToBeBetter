import { Component } from '@angular/core';

import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { MePage } from '../me/me';
import { PlanPage } from '../plan/plan';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = PlanPage;
  tab3Root = ContactPage;
  tab4Root = MePage;

  constructor() {

  }
}
