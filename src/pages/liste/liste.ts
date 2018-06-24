import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import {ConfigServiceTsProvider} from '../../providers/config-service-ts/config-service-ts';
import { DecoPage } from '../deco/deco';
import { LoginPage } from '../login/login';
import { AuthenticationService } from '../../services/authentication.service';
import { WordpressService } from '../../services/wordpress.service';
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
  partenaire:Array<any> = new Array<any>();
  partenaire_display:Array<any> = new Array<any>();
  image:Array<any> = new Array<any>();
  partenaireimg:Array<any> = new Array<any>();
teste:any
  hide: any;
  listes: any[];
  loggedUser: boolean=false;
  test= 'none';
  lie= 'none';
  tda='none';
  ageselected='';
  catselected='';
  lieuselected='';
  partenaire_marker:Array<any> = new Array<any>();
  a : 1

activite:Array<any> = new Array<any>();
lieu: Array<any> = new Array<any>();
tdage:Array<any> = new Array<any>();
  idvalue: any;
show = false



  constructor(public nav: NavController, 
    public navParams: NavParams,
     private http: Http,
      public ConfigServ: ConfigServiceTsProvider,
    public authenticationService: AuthenticationService,
    public wordpressService :    WordpressService,
    

  ) {
  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ListePage');
           Observable.forkJoin(
            this.getPartenaire()).subscribe(data=> {
              let item = data[0];
            
              for( let i = 0; i < item.length; i++){
                let items= item[i];

                //service qui va chercher l'image avec items.featured_media
                 Observable.forkJoin(this.getImage( items.featured_media )).subscribe(data => {

                  items.image = data[0].source_url;
                  this.partenaire.push(items);
                  this.partenaire_display.push(items);
                  console.log(this.partenaire_display);

                 });
                
                
                }


                
              
            
            })
      
  

      Observable.forkJoin(
        this.getActivite()).subscribe(data=> {
          let item= data[0]
          for( let i = 0; i < item.length; i++){
               let items= item[i]
  
            this.activite.push(items);
          }
        
        })
      Observable.forkJoin(
        this.getLieu()).subscribe(data=> {
            let items = data[0]
          for( let i = 0; i < items.length; i++){
            let item = items[i];
            if(item){
              this.lieu.push(item);
            }
          }
        
        })
        Observable.forkJoin(
           
          this.getAge()).subscribe(data=> {
            let items = data[0]
            for( let i = 0; i < items.length; i++){
              let item = items[i];
              
              if(item){
                this.tdage.push(item);
              }
              
            }
          
          })
   
            // Observable.forkJoin(
            //   this.getImage()).subscribe(data=> {
            //     let item = data[0];
            //     for( let i = 0; i <= item.length; i++){
            //       let items= item[i];
        
            //       this.image.push(items.guid.rendered);
            //       console.log(this.image)
            //     }
              
            //   })
    // this.callBDD( this.http)
  }

  ionViewDidLoad(caca){
    let idvalue2 = caca.path[1].id
    console.log(idvalue2)
  }

  getActivite(){

    return this.wordpressService.getActivites(this.activite);

  }

  getLieu(){

    return this.wordpressService.getLieu(this.lieu);

  }


  getAge(){

    return this.wordpressService.getAge(this.age);

  }
  getImage( image_id ){

    return this.wordpressService.getImage( image_id );

  }
  getPartenaire(){
    return this.wordpressService.getPartenaire(this.partenaire);

  }
// //   callBDD( $http) {
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

  age = false ;
  clickage(){
    if(this.age==false){
      this.age=true
      this.categorie=false
      this.localisation=false

      document.getElementById('clickage').style.display = "flex";
      document.getElementById('clickage').style.transition = "1s";
      document.getElementById('clickcategorie').style.display = "none";
      document.getElementById('clicklocalisation').style.display = "none";
      this.tda="block"
      this.lie="none"
      this.test="none"
    }
    else{
      this.age=false
      document.getElementById('clickage').style.display = "none";
      document.getElementById('clickage').style.transition = "1s";
      this.categorie=false
      this.localisation=false
      this.tda="none"



    }


  }

  categorie=false
clickcategorie(){
  if(this.categorie==false){
    this.categorie=true
    this.age=false
    this.localisation=false
    document.getElementById('clickcategorie').style.display = "flex";
    document.getElementById('clickcategorie').style.transition = "1s";   
    document.getElementById('clicklocalisation').style.display = "none";
    document.getElementById('clickage').style.display = "none";
    this.test="block";
    this.tda="none";
    this.lie="none"
  }
  else{
    this.categorie=false
    this.age=false
    this.localisation=false
    document.getElementById('clickcategorie').style.display = "none";
    document.getElementById('clickcategorie').style.transition = "1s";
    this.test="none";
 
  }
  

}
localisation =false
clicklocalisation(){
  if(this.localisation==false){
    this.localisation=true
    document.getElementById('clicklocalisation').style.display = "block";
    document.getElementById('clickcategorie').style.display = "none";
    document.getElementById('clickage').style.display = "none";
    document.getElementById('clicklocalisation').style.transition = "1s";
    this.lie="block";
    this.test="none";
    this.tda="none";

  }
  else{
    this.categorie=false
    this.age=false
    this.localisation=false
    document.getElementById('clicklocalisation').style.display = "none";
    document.getElementById('clicklocalisation').style.transition = "1s";
    this.lie="none";


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

filter(){

  this.partenaire_display = this.partenaire.slice(); //copy array
  if( this.ageselected.length > 0 ){
  // Pour chaque partenaire
  for( let i=this.partenaire_display.length-1; i >= 0 ; i-- ){
    var partenaires = this.partenaire_display[i]

      var find = false;
    
      // Pour chaque age coché
      for( let age of this.ageselected ){
        
        let int_age = parseInt(age);
        
        // Si on trouve au moins une fois l'age dans le tableau du partenaire
        if( partenaires["tranche-dage"].indexOf(int_age) > -1 ){
          find = true;
          break;
        }
        
      }
    
      // Si aucune correspondance, on enlève l'élément du tableau
      if( !find ){
        this.partenaire_display.splice(i, 1);
      }
  
    }
  }
//categories
// Pour chaque partenaire
if( this.catselected.length > 0 ){

  for( let i=this.partenaire_display.length -1; i >= 0; i--){
    
    var partenaires = this.partenaire_display[i];
    var find = false;

    // Pour chaque cat coché
    for( let cat of this.catselected ){
      
      let int_cat = parseInt(cat);
      
      // Si on trouve au moins une fois l'cat dans le tableau du partenaire
      if( partenaires["type-activite"].indexOf(int_cat) > -1 ){ 
        console.log( partenaires["type-activite"]);

        find = true;
        break;
      }
      
    }

    // Si aucune correspondance, on enlève l'élément du tableau
    if( !find ){
      this.partenaire_display.splice(i, 1);
    }

  }

}
//lieu
// Pour chaque partenaire
if( this.lieuselected.length > 0 ){

  for( let i=this.partenaire_display.length -1; i >= 0; i--){
    
    var partenaires = this.partenaire_display[i];
    var find = false;

    // Pour chaque lieu coché
    for( let lieu of this.lieuselected ){
      
      let int_lieu = parseInt(lieu);
      
      // Si on trouve au moins une fois l'lieu dans le tableau du partenaire
      if( partenaires["zone-geographique"].indexOf(int_lieu) > -1 ){ 
        console.log( partenaires["zone-geographique"]);

        find = true;
        break;
      }
      
    }

    // Si aucune correspondance, on enlève l'élément du tableau
    if( !find ){
      this.partenaire_display.splice(i, 1);
    }

  }

}
}


  clickshow(pipi){
   
    let a : 1 
    let idvalue =  1 + pipi.path[1].id
     if(this.show == false){
       this.show = true
      document.getElementById(idvalue).style.display="block"
      console.log(pipi.path[1].id)
      console.log(idvalue)
    }
    else{
      document.getElementById(idvalue).style.display="none"
      this.show= false

    }
  }
  }