import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationService } from '../../services/authentication.service';
import { DecoPage } from '../deco/deco';
import { LoginPage } from '../login/login';

/**
 * Generated class for the CartePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carte',
  templateUrl: 'carte.html',
})
export class CartePage {
  loggedUser: boolean=false;

  constructor(public nav: NavController, public navParams: NavParams, public authenticationService: AuthenticationService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartePage');
  }
  ionViewWillEnter() {
	
    this.authenticationService.getUser()
    .then(
      (data) => {
      this.loggedUser = true;
      console.log(this.loggedUser) ;
      document.getElementById('divpopup').style.display = "none";
      document.getElementById('fond').style.display = "none";
      document.getElementById('fondnouser').style.display = "none";


      },
      error => this.loggedUser = false
   
 
    ); 
 
    
   }

   afficher(){

  }
  clickliste(){
    this.nav.setRoot('ListePage');
    


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
    this.authenticationService.getUser()
    .then(
      (data) => {
      this.loggedUser = true;
      console.log(this.loggedUser) ;
      this.nav.setRoot(DecoPage);


      },
      (error) => {this.loggedUser = false;
      this.nav.setRoot(LoginPage);

      }

 
    );
  }
 
  
  clickfond(){
    this.boolean=false
    document.getElementById('pagesearch').style.display = "none";
    document.getElementById('fond').style.display = "none";
  }
  agesearch=false
  catsearch=false
  locsearch=false
  clickagesearch(){
    console.log('trolololo')
    if(this.agesearch==false){
      this.agesearch=true
      this.catsearch=false
      this.locsearch=false
  
      document.getElementById('clickag').style.height = "80px";
      document.getElementById('clickag').style.transition = "1s";
      document.getElementById('clickcategori').style.height = "0px";
      document.getElementById('clicklocalisatio').style.height = "0px";
    }
    else{
      this.agesearch=false
      document.getElementById('clickag').style.height = "0px";
      document.getElementById('clickag').style.transition = "1s";
      this.catsearch=false
      this.locsearch=false
  
  
    }
  
  
  }
  
  clickcatsearch(){
  if(this.catsearch==false){
    this.catsearch=true
    this.agesearch=false
    this.locsearch=false
    document.getElementById('clickcategori').style.height = "80px";
    document.getElementById('clickcategori').style.transition = "1s";   
    document.getElementById('clicklocalisatio').style.height = "0px";
    document.getElementById('clickag').style.height = "0px";
  
  
  }
  else{
    this.catsearch=false
    this.agesearch=false
    this.locsearch=false
    document.getElementById('clickcategori').style.height = "0px";
    document.getElementById('clickcategori').style.transition = "1s";
  ;
  }
  
  
  }
  
  clicklocsearch(){
  if(this.locsearch==false){
    this.locsearch=true
    document.getElementById('clicklocalisatio').style.height = "80px";
    document.getElementById('clickcategori').style.height = "0px";
    document.getElementById('clickag').style.height = "0px";
    document.getElementById('clicklocalisatio').style.transition = "1s";
    document.getElementById('ploc').style.display = "block";
  
  }
  else{
    this.catsearch=false
    this.agesearch=false
    this.locsearch=false
    document.getElementById('clicklocalisatio').style.height = "0px";
    document.getElementById('clicklocalisatio').style.transition = "1s";
    document.getElementById('ploc').style.display = "none";
  
  }
  
  }
}

