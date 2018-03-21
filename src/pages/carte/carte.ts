import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public nav: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartePage');
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
    this.nav.setRoot('LoginPage');

  }
  clickfond(){
    this.boolean=false
    document.getElementById('pagesearch').style.display = "none";
    document.getElementById('fond').style.display = "none";
  }

}

