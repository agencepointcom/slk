import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { BrowserModule } from '@angular/platform-browser';
import { AndroidPermissions } from '@ionic-native/android-permissions';


import { MyApp } from './app.component';
import { HomePageModule } from '../pages/home/home.module';
import { IonicStorageModule } from '@ionic/storage';

import { Geolocation } from '@ionic-native/geolocation';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

import { AuthProvider } from '../providers/auth/auth';
import { AuthService } from '../services/auth';
import {TokenExpiration} from "../services/token-expiration";
import {TokenInterceptor} from "../services/token-interceptor";
import {LoginPageModule} from "../pages/login/login.module";
import { CartePageModule } from '../pages/carte/carte.module';
import { DecoPageModule } from '../pages/deco/deco.module';
import { ListePageModule } from '../pages/liste/liste.module';

import { TesthomePageModule } from '../pages/testhome/testhome.module';
import {DescriptionPageModule} from'../pages/description/description.module';
import { ConfigServiceTsProvider } from '../providers/config-service-ts/config-service-ts';
import { NativeStorage } from '@ionic-native/native-storage';
import { AuthenticationService } from '../services/authentication.service';
import { WordpressService} from '../services/wordpress.service';




@NgModule({
  declarations: [
    MyApp,
  
  ],
  imports: [
    HttpModule,
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
    DecoPageModule,
    ListePageModule,
    TesthomePageModule,
    DescriptionPageModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeStorage,
    AuthenticationService,
    WordpressService,

    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    AuthProvider,
    AuthService,
    TokenExpiration,
    ConfigServiceTsProvider,
    AndroidPermissions

  ]
})
export class AppModule { }
