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

import { ConfirmComponent } from './components/confirm/confirm.component';
import {FormsModule} from '@angular/forms';
import { ManageComponent } from './components/manage/manage.component';
import { LoginComponent } from './components/login/login.component';
import { ModalModule } from 'ngx-bootstrap/modal';

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
    ConfirmComponent,
    ManageComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule.forRoot(),
    RouterModule.forRoot([
      { path: 'login',component:LoginComponent },
      { path: 'sidebar', component: SidebarComponent },
      { path: 'home', component: HomeComponent },
      { path: 'question', component: QuestionsComponent },
      { path: 'recommend', component: RecommendComponent },
      { path: 'recommend/confirm/:rid', component: ConfirmComponent },
      { path: 'shoulds', component: ShouldsComponent },
      { path: 'shoulds/manage/:sid', component: ManageComponent },
      { path: 'feedback', component: FeedbackComponent },
      { path: 'information', component: InformationComponent },
      { path: 'infodetail', component: InfodetailComponent },
      { path: 'infodetail/:userid', component: InfodetailComponent },
      { path: 'admins', component: AdminsComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', component: HomeComponent }
    ]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
