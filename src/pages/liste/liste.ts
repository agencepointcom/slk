import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {ConfigServiceTsProvider} from '../../providers/config-service-ts/config-service-ts';
/**
 * Generated class for the ListePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-liste',
  templateUrl: 'liste.html',
  providers :[ConfigServiceTsProvider]
})
export class ListePage {
  listes: any[];
  constructor(public nav: NavController, public navParams: NavParams, private http: Http, public ConfigServ: ConfigServiceTsProvider ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListePage');

    // this.callBDD( this.http)
  }

  ionViewDidEnter(){
    this.ConfigServ.getlistes()
      //Au moment ou la requête est terminé, subscribe se déclenche !
      .subscribe( (data) => {
            var liste = data;
            //console.log(users[0].name);
            // for(var i=0; i<users.length; i++){
            //   if(users[i].name == 'Nyle' && users[i].email == 'j.alsina@hotmail.fr'){
            //     //console.log("OK")
            //   }     
            //   //console.log(users[i]);       
            // }
      },
        err => {
            alert(err);
      });
  }
//   callBDD( $http) {
//     $http.get('../../bdd_wp.php').then(successCallback, errorCallback);

// function successCallback(response){

// this.terms = response.data;}
// function errorCallback(error){
//     //error code
// }
//   }

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

  age = false ;
  clickage(){
    if(this.age==false){
      this.age=true
      this.categorie=false
      this.localisation=false

      document.getElementById('clickage').style.height = "80px";
      document.getElementById('clickage').style.transition = "1s";
      document.getElementById('clickcategorie').style.height = "0px";
      document.getElementById('clicklocalisation').style.height = "0px";
    }
    else{
      this.age=false
      document.getElementById('clickage').style.height = "0px";
      document.getElementById('clickage').style.transition = "1s";
      this.categorie=false
      this.localisation=false


    }


  }

  categorie=false
clickcategorie(){
  if(this.categorie==false){
    this.categorie=true
    this.age=false
    this.localisation=false
    document.getElementById('clickcategorie').style.height = "80px";
    document.getElementById('clickcategorie').style.transition = "1s";   
    document.getElementById('clicklocalisation').style.height = "0px";
    document.getElementById('clickage').style.height = "0px";


  }
  else{
    this.categorie=false
    this.age=false
    this.localisation=false
    document.getElementById('clickcategorie').style.height = "0px";
    document.getElementById('clickcategorie').style.transition = "1s";
 ;
  }
  

}
localisation =false
clicklocalisation(){
  if(this.localisation==false){
    this.localisation=true
    document.getElementById('clicklocalisation').style.height = "35px";
    document.getElementById('clickcategorie').style.height = "0px";
    document.getElementById('clickage').style.height = "0px";
    document.getElementById('clicklocalisation').style.transition = "1s";
    document.getElementById('ploc').style.display = "block";

  }
  else{
    this.categorie=false
    this.age=false
    this.localisation=false
    document.getElementById('clicklocalisation').style.height = "0px";
    document.getElementById('clicklocalisation').style.transition = "1s";
    document.getElementById('ploc').style.display = "none";

  }
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
