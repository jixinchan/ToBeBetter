import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MePage } from '../pages/me/me';
import { PlanPage } from '../pages/plan/plan';

import { MultiPickerModule } from 'ion-multi-picker';
import { ReciveServeProvider } from '../providers/recive-serve/recive-serve';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import {IonicStorageModule} from '@ionic/storage';
import { WelcomePage } from '../pages/welcome/welcome';

import { WeatherProvider } from '../providers/weather/weather';
import { QuickloginProvider } from '../providers/quicklogin/quicklogin';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';
@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    MePage,
    PlanPage,
    WelcomePage,
  ],
  imports: [
    BrowserModule,
    MultiPickerModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      tabsHideOnSubPages:true
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    HomePage,
    TabsPage,
    MePage,
    PlanPage,
    WelcomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ImagePicker,
    Camera,
    QuickloginProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ReciveServeProvider,WeatherProvider
  ]
})
export class AppModule {}
