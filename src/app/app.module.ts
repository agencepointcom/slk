import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';


import { MyApp } from './app.component';
import { HomePageModule } from '../pages/home/home.module';
import { IonicStorageModule } from '@ionic/storage';

import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import { AuthProvider } from '../providers/auth/auth';
import { ApiProvider } from '../providers/api/api';
import { AuthService } from '../services/auth';
import {TokenExpiration} from "../services/token-expiration";
import {TokenInterceptor} from "../services/token-interceptor";
import {LoginPageModule} from "../pages/login/login.module";
import { CartePageModule } from '../pages/carte/carte.module';




@NgModule({
  declarations: [
    MyApp,
  
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: true,

    }),
    IonicStorageModule.forRoot(),
    HttpModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    LoginPageModule,
    CartePageModule,
    HomePageModule,


  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    ApiProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthProvider,
    ApiProvider,
    AuthService,
    TokenExpiration,

  ]
})
export class AppModule { }
