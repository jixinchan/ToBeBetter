import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { RecommendComponent } from './components/recommend/recommend.component';
import { ShouldsComponent } from './components/shoulds/shoulds.component';
import { FeedbackComponent } from './components/feedback/feedback.component';
import { InformationComponent } from './components/information/information.component';
import { InfodetailComponent } from './components/infodetail/infodetail.component';
import { AdminsComponent } from './components/admins/admins.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HomeComponent,
    QuestionsComponent,
    RecommendComponent,
    ShouldsComponent,
    FeedbackComponent,
    InformationComponent,
    InfodetailComponent,
    AdminsComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'sidebar', component: SidebarComponent },
      { path: 'home', component: HomeComponent },
      { path: 'question', component: QuestionsComponent },
      { path: 'recommend', component: RecommendComponent },
      { path: 'shoulds', component: ShouldsComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'information', component: InformationComponent },
      // { path: 'infodetail', component: InfodetailComponent },
      { path: 'infodetail/:userid', component: InfodetailComponent },
      { path: 'admins', component: AdminsComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: '**', component: HomeComponent }
    ]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
