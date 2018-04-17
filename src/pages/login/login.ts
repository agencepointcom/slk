import {HomePage} from '../home/home';
import { Component } from '@angular/core';
import {App, Events, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
;

import { AuthProvider } from '../../providers/auth/auth';
import { AuthService } from '../../services/auth';
import * as AppConfig from "../../app/app.config";
import {ConfigServiceTsProvider} from '../../providers/config-service-ts/config-service-ts';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {


    email;
    password;
   
    constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider) {
      if(localStorage.getItem('wpIonicToken')){
        this.navCtrl.setRoot('HomePage');
      }
    }
   
    ionViewDidLoad() {
      console.log('ionViewDidLoad LoginPage');
    }
   
    onLogin(){
      console.log(this.email, this.password);
      this.authProvider.postLogin(this.email, this.password).subscribe(data => {
        console.log(data);
        localStorage.setItem('wpIonicToken', JSON.stringify(data));
      });
    }
    clickparcourir(){
      this.navCtrl.setRoot('HomePage');
 
    }
   }

   