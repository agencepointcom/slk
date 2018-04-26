import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginPage } from '../login/login';

/**
 * Generated class for the DecoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deco',
  templateUrl: 'deco.html',
})
export class DecoPage {

  
  constructor(public nav: NavController,
               public navParams: NavParams,
              public authenticationService:AuthenticationService,
             ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DecoPage');
  }
  logOut(){
    this.authenticationService.logOut()
    .then(
      res => this.nav.push(LoginPage),
      err => console.log('Error in log out')
    )
  }
  clickliste(){
    this.nav.setRoot('ListePage');
    ;


  }
  clickmap(){
    this.nav.setRoot('HomePage');

  }
  boolean =false
  clicksearch(){
    if(this.boolean==false){
    this.boolean=true
    document.getElementById('pagesearch').style.display = "flex";
    document.getElementById('fond').style.display = "flex";
    }
    else{
      this.boolean=false
      document.getElementById('pagesearch').style.display = "none";
      document.getElementById('fond').style.display = "none";
    }

  }
  clickcarte(){
    this.nav.setRoot('CartePage');

  }
  clickexit(){
    
    this.nav.setRoot('LoginPage');

  }
}
