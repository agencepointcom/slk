import { identifierModuleUrl } from '@angular/compiler/compiler';
import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController, AlertController, App, LoadingController, NavController, Platform, ToastController, IonicPage } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { AndroidPermissions } from '@ionic-native/android-permissions';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import {
  GoogleMapsEvent,
  MarkerCluster,
  Marker,
  GoogleMap
} from "@ionic-native/google-maps";
import { AuthenticationService } from '../../services/authentication.service';
import { DecoPage } from '../deco/deco';
import { LoginPage } from '../login/login';
import { WordpressService } from '../../services/wordpress.service';

declare var google: any;
declare var MarkerClusterer: any;
@IonicPage()

@Component({
  selector: 'page-testhome',
  templateUrl: 'testhome.html',
})
export class TesthomePage {
  partenaire: Array<any> = new Array<any>();;
  partenaire_marker: Array<any> = new Array<any>();
  locations: any;
  @ViewChild('map') mapElement: ElementRef;
  @ViewChild('searchbar', { read: ElementRef }) searchbar: ElementRef;
  addressElement: HTMLInputElement = null;

  listSearch: string = '';

  map: any;
  marker: "";
  loading: any;
  search: boolean = false;
  error: any;
  switch: string = "map";
  markercluster:""
  regionals: any = [];
  currentregional: any;
  markerCluster: any;
  mapLoaded: any;
  morePagesAvailable: boolean = true;
  loggedUser: boolean=false;
  activite:Array<any> = new Array<any>();
lieu: Array<any> = new Array<any>();
tdage:Array<any> = new Array<any>();
 

  constructor(
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public app: App,
    public nav: NavController,
    public zone: NgZone,
    public platform: Platform,
    public alertCtrl: AlertController,
    public storage: Storage,
    public actionSheetCtrl: ActionSheetController,
    public geolocation: Geolocation,
    private androidPermissions: AndroidPermissions,
    public authenticationService: AuthenticationService,
    public wordpressService: WordpressService
  ) {
    this.platform.ready().then(() => this.loadMaps());
    console.log('Hello GoogleMapsCluster Provider');
    //permission localisation 
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION).then(
      result => console.log('Has permission?',result.hasPermission),
      err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION)
    );
    
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.ACCESS_FINE_LOCATION, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);
    this.locations = [
       
    ];
}

ionViewWillEnter() {
  this.authenticationService.getUser()
  .then(
    (data) => {
    this.loggedUser = true;
    console.log(this.loggedUser) ;

    },
   (error) => {
     this.loggedUser = false;
    console.log(this.loggedUser)
 
   }
  ); 
    console.log('ionViewDidLoad ListePage');
  

      Observable.forkJoin(
        this.getActivite()).subscribe(data=> {
          for( let i = 0; i <= data.length; i++){
            let item = data[0][i];
  
            this.activite.push(item.name);
            console.log(this.activite)
          }
        
        })
      Observable.forkJoin(
        this.getLieu()).subscribe(data=> {
          for( let i = 0; i <= data.length; i++){
            let item = data[0][i];
  
            this.lieu.push(item.name);
            console.log(this.lieu)
          }
        
        })
        Observable.forkJoin(
          this.getAge()).subscribe(data=> {
            for( let i = 0; i <= data.length; i++){
              let item = data[0][i];
    
              this.tdage.push(item.name);
              console.log(this.tdage)
            }
          
          })
          Observable.forkJoin(
            this.getPartenaire()).subscribe(data=> {
              let item = data[0];
          
              for( let i = 0; i < item.length; i++){
                let items= item[i];
        
                //service qui va chercher l'image avec items.featured_media
              
                  this.partenaire_marker.push(items.martygeocoderlatlng.martygeocoderlatlng);
                  console.log(this.partenaire_marker);
        
                }
                
                
                
        })
      }
  
  
  getActivite(){

    return this.wordpressService.getActivites(this.activite);

  }

  getLieu(){

    return this.wordpressService.getLieu(this.lieu);

  }

 

  getAge(){

    return this.wordpressService.getAge(this.tdage);

  }
  getPartenaire(){
    return this.wordpressService.getPartenaire(this.partenaire);

  }

addMarkerMap(markers){
  for(let marker of markers){
    var loc ={ lat: marker.latitude, lng:marker.longitude}
    console.log(loc);
    marker= new google.maps.Marker({
      position:loc,
      map: this.map
    })
  }
}
        
      
    
    
addCluster(map){
 
  if(google.maps){

      //Convert locations into array of markers
      let markers = this.locations.map((location) => {
          return new google.maps.Marker({
              position: location,
              label: "Hello!"
          });
      });

      this.markerCluster = new MarkerClusterer(map, markers, {imagePath: 'assets/m'});

  } else {
      console.warn('Google maps needs to be loaded before adding a cluster');
  }

}


  viewPlace(id) {
    console.log('Clicked Marker', id);
  }


  loadMaps() {
    if (!!google) {
      this.initializeMap();
     ;

    //  this.initAutocomplete();
    } else {
      this.errorAlert('Error', 'Something went wrong with the Internet Connection. Please check your Internet.')
    }
  }

  errorAlert(title, message) {
    let alert = this.alertCtrl.create({
      title: title,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: data => {
            this.loadMaps();
          }
        }
      ]
    });
    alert.present();
  }

  mapsSearchBar(ev: any) {
    // set input to the value of the searchbar
    //this.search = ev.target.value;
    console.log(ev);
    const autocomplete = new google.maps.places.Autocomplete(ev);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          sub.next(place.geometry.location);
          sub.complete();
        }
      });
    });
  }

  initAutocomplete(): void {
 
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.createAutocomplete(this.addressElement).subscribe((location) => {
      console.log('Searchdata', location);

      let options = {
        center: location,
        zoom: 15
      };
      this.map.setOptions(options);

    });
  }

  createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    const autocomplete = new google.maps.places.Autocomplete(addressEl);
    autocomplete.bindTo('bounds', this.map);
    return new Observable((sub: any) => {
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          sub.error({
            message: 'Autocomplete returned place with no geometry'
          });
        } else {
          console.log('Search Lat', place.geometry.location.lat());
          console.log('Search Lng', place.geometry.location.lng());
          sub.next(place.geometry.location);
          //sub.complete();
        }
      });
    });
  }

  initializeMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 3,
      center: {lat: -28.024, lng: 140.887}
    });

    // Create an array of alphabetical characters used to label the markers.
   
  }

  //Center zoom
  //http://stackoverflow.com/questions/19304574/center-set-zoom-of-map-to-cover-all-visible-markers
  bounceMap(markers) {
    let bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].getPosition());
    }

    this.map.fitBounds(bounds);
  }

  resizeMap() {
    setTimeout(() => {
      google.maps.event.trigger(this.map, 'resize');
    }, 200);
  }

  getCurrentPositionfromStorage(markers) {
    this.storage.get('lastLocation').then((result) => {
      if (result) {
        let myPos = new google.maps.LatLng(result.lat, result.long);
        this.map.setOptions({
          center: myPos,
          zoom: 9
        });
        let marker = this.addMarker(myPos, "Mon ancienne position sauvegardée: " + result.location);

        markers.push(marker);
        // this.bounceMap(markers);

        this.resizeMap();
      }
    });
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  choosePosition() {
    console.log(this.loggedUser)  
    this.storage.get('Dernière position').then((result) => {
      if (result) {
        let actionSheet = this.actionSheetCtrl.create({
          buttons: [
            {
              text: 'Recharger',
              handler: () => {
                this.initializeMap();
                this.getCurrentPosition();
              }
            },
            {
              text: 'Supprimer',
              handler: () => {
                this.storage.set('Dernière Position ', null);
                this.showToast('Position supprimée!');
                this.initializeMap();
              }
            },
            {
              text: 'Annuler',
              role: 'Annuler',
              handler: () => {
              }
            }
          ]
        });
        actionSheet.present();
      } else {
        this.getCurrentPosition();

      }
    });
  }

  // go show currrent location
  getCurrentPosition()    {
    // attente recherche de votre position
    this.loading = this.loadingCtrl.create({
      content: 'Recherche de votre position ...'
    });
    this.loading.present();
//temps 10 seconde
    let locationOptions = { timeout: 100, enableHighAccuracy: true };
    //si le navigateur trouve la position
    if(navigator.geolocation){
      var options={
        // enableHighAccuracy est un Boolean qui indique que l'application souhaite recevoir les meilleurs résultats possibles
        enableHighAccuracy: true

      }
      navigator.geolocation.getCurrentPosition(
        
        (position) => {
          //
          this.loading.dismiss().then(() => {
  
            this.showToast('Position trouvée!');
  
            console.log(position.coords.latitude, position.coords.longitude);
            let myPos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            let options = {
              center: myPos,
              zoom: 14
            };
            this.map.setOptions(options);
            this.addMarker(myPos, "Mein Standort!");
  
            let alert = this.alertCtrl.create({
              title: 'Position',
              message: 'Voulez vous sauvegarder la position?',
              buttons: [
                {
                  text: 'Annuler'
                },
                {
                  text: 'Sauvegarder',
                  handler: data => {
                    let lastLocation = { lat: position.coords.latitude, long: position.coords.longitude };
                    console.log(lastLocation);
                    this.storage.set('Dernière position', lastLocation).then(() => {
                      this.showToast('Position sauvegardée');
                    });
                  }
                }
              ]
            });
            alert.present();
  
          });
        },
        (error) => {
          this.loading.dismiss().then(() => {
            this.showToast("Position non trouvée. Merci d'activer votre GPS!");
  
            console.log(error);
          }, options);
        }
      )
    }

  }

  toggleSearch() {
    if (this.search) {
      this.search = false;
    } else {
      this.search = true;
    }
  }

  addMarker(position, content) {
    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: position
    });

    this.addInfoWindow(marker, content);
    return marker;
  }

  addInfoWindow(marker, content) {
    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });
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
    document.getElementById('legendes').style.left = "-22%";
    document.getElementById('legendes').style.transition = "1s";
  }
  clicklegende(){

    document.getElementById('legendes').style.top = "25%";
    document.getElementById('legendes').style.transition = "1s";
    }
   clicklegendes(){
      document.getElementById('legendes').style.top = "100%";
      document.getElementById('legendes').style.transition = "1s";
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

  
