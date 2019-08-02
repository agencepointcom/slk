import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, AlertController, LoadingController, ModalController} from 'ionic-angular';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { ConfigServiceTsProvider } from '../../providers/config-service-ts/config-service-ts';
import { DecoPage } from '../deco/deco';
import { LoginPage } from '../login/login';
import { AuthenticationService } from '../../services/authentication.service';
import { WordpressService } from '../../services/wordpress.service';
import { CartePage } from '../carte/carte';
import { HomePage } from '../home/home';
import {Storage} from "@ionic/storage";
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';

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
    providers: [ConfigServiceTsProvider]
})
export class ListePage {
    partenaire: Array<any> = new Array<any>();
    partenaire_display: Array<any> = new Array<any>();
    image: Array<any> = new Array<any>();
    partenaireimg: Array<any> = new Array<any>();
    teste: any
    hide: any;
    listes: any[];
    loggedUser: boolean = false;
    test = 'none';
    lie = 'none';
    tda = 'none';
    ageselected = '';
    catselected = '';
    lieuselected = '';
    partenaire_marker: Array<any> = new Array<any>();
    a: 1;

    activite: Array<any> = new Array<any>();
    lieu: Array<any> = new Array<any>();
    tdage: Array<any> = new Array<any>();
    idvalue: any;
    show = false;
    userdata: any;
    cartePage: any;
    decoPage: any;
    homePage: any;

    public activitiesDone: {id: number}[] = [];
    public voteInProgress: boolean = false;

    constructor(public nav: NavController,
                public navParams: NavParams,
                private http: Http,
                public ConfigServ: ConfigServiceTsProvider,
                public authenticationService: AuthenticationService,
                public wordpressService: WordpressService,
                public alertCtrl: AlertController,
                public storage: Storage,
                public loadingCtrl: LoadingController,
                private launchNavigator: LaunchNavigator,
                public geolocation: Geolocation,
                public modalCtrl: ModalController,

    ) {
        this.userdata = navParams.data.userdata;
        this.homePage = HomePage;
        this.cartePage = CartePage;
        this.decoPage = DecoPage;

        /*
        this.storage.get('activities_done').then(activities => {
            if( activities ) {
                this.activitiesDone = activities;
            }
        });
        */
    }

    ionViewWillEnter() {
        console.log('ionViewDidLoad ListePage');
        Observable.forkJoin(
            this.getPartenaire()).subscribe( (data) => {
            let item = data[0];

            for (let i = 0; i < item.length; i++) {
                let items = item[i];

                //service qui va chercher l'image avec items.featured_media
                Observable.forkJoin(this.getImage(items.featured_media)).subscribe(data => {

                    items.image = data[0].source_url;
                    this.partenaire.push(items);
                    this.partenaire_display.push(items);

                });


            }





        });



        Observable.forkJoin(
            this.getActivite()).subscribe(data => {
            let item = data[0]
            for (let i = 0; i < item.length; i++) {
                let items = item[i]

                this.activite.push(items);
            }

        })
        Observable.forkJoin(
            this.getLieu()).subscribe(data => {
            let items = data[0]
            for (let i = 0; i < items.length; i++) {
                let item = items[i];
                if (item) {
                    this.lieu.push(item);
                }
            }

        })
        Observable.forkJoin(

            this.getAge()).subscribe(data => {
            let items = data[0]
            for (let i = 0; i < items.length; i++) {
                let item = items[i];

                if (item) {
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

    ionViewDidLoad() {
    }

    getActivite() {

        return this.wordpressService.getActivites(this.activite);

    }

    getLieu() {

        return this.wordpressService.getLieu(this.lieu);

    }


    getAge() {

        return this.wordpressService.getAge(this.age);

    }
    getImage(image_id) {

        return this.wordpressService.getImage(image_id);

    }
    getPartenaire() {
        return this.wordpressService.getPartenaire(this.partenaire);

    }
    postaller() {
        return this.wordpressService.updateActivites(this.partenaire);

    }
    // //   callBDD( $http) {
    //     $http.get('../../bdd_wp.php').then(successCallback, errorCallback);

    // function successCallback(response){

    // this.terms = response.data;}
    // function errorCallback(error){
    //     //error code
    // }
    //   }

    /***
     parseNumber(number) {
    return parseInt(number);
  }

     goPlace(id, index) {

    console.log(JSON.stringify(this.partenaire[index].martygeocoderlatlng.martygeocoderlatlng));

      var itemstring = this.partenaire[index].martygeocoderlatlng.martygeocoderlatlng.toString();

      itemstring = itemstring.replace(")", ""); //"{42.827682, 2.225718899999947"
      itemstring = itemstring.replace("(", ""); //"42.827682, 2.225718899999947"
      let splited = itemstring.split(","); // [ 42.827682, 2.225718899999947 ]
      let coords = {
          lat: parseFloat(splited[0]),
          lng: parseFloat(splited[1])
      };

      this.geolocation.getCurrentPosition().then(response => {
          this.launchNavigator.navigate([coords.lat, coords.lng], {
              start: response.coords.latitude + ', ' + response.coords.longitude,
              appSelection: {
                  dialogHeaderText: "Sélectionnez une application pour l'itinéraire",
                  cancelButtonText: "Cancel",
                  rememberChoice: {
                      prompt: {
                          headerText: "Se souvenir de mon choix ?",
                          bodyText: "Utiliser la même application la prochaine fois ?",
                          yesButtonText: "Oui",
                          noButtonText: "Non"
                      }
                  }
              }
          });
      });
  }

  jyete(id, index) {

      //let voted = false;
      if( this.voteInProgress ) {
        return false;
      }

      let loading = this.loadingCtrl.create({
          content: ''
      });

      loading.present();

      this.voteInProgress = true;
      this.authenticationService.getUser()
          .then(user => {

                  Object.keys(this.activitiesDone).forEach(key => {
                      if (this.activitiesDone[key]['id'] === id) {
                          voted = true;
                      }
                  });


                  this.wordpressService.iWasHere(id, user.nicename).subscribe((response) => {
                    console.log(response);
                    if( response.status ) {
                        this.partenaire[index].martygeocoderlatlng.simplefavorites_count = parseInt(this.partenaire[index].martygeocoderlatlng.simplefavorites_count) + 1;
                    } else {
                        this.partenaire[index].martygeocoderlatlng.simplefavorites_count = parseInt(this.partenaire[index].martygeocoderlatlng.simplefavorites_count) - 1;
                    }
                    this.voteInProgress = false;
                    loading.dismiss();
                  }, error => {
                    console.log(error);
                    console.log(JSON.stringify(error));
                    loading.dismiss();
                  });


                  if( voted ) {
                      this.voteInProgress = false;
                      this.errorAlert('Vous avez déjà indiqué avoir été présent dans ce lieu');
                      return false;
                  } else {
                      this.wordpressService.iWasHere(id, user.nicename).subscribe(() => {
                          this.partenaire[index].martygeocoderlatlng.simplefavorites_count = parseInt(this.partenaire[index].martygeocoderlatlng.simplefavorites_count) + 1;
                          this.activitiesDone = this.activitiesDone.concat({'id': id});
                          this.storage.set('activities_done', this.activitiesDone);
                          this.voteInProgress = false;
                      }, error => {
                          this.voteInProgress = false;
                          console.log(JSON.stringify(error));
                          this.errorAlert('Une erreur est survenue durant l\'opération. Si le problème persiste, veuillez contacter l\'équipe technique en charge de l\'application.');
                      });
                  }

          }, error => {
              this.voteInProgress = false;
              loading.dismiss();
              this.errorAlert('Vous devez être connecté pour participer aux votes');
          });
  };
     ***/

    errorAlert(message) {
        let alert = this.alertCtrl.create({
            message: message,
            buttons: [
                {
                    text: 'OK',
                    handler: data => {

                    }
                }
            ]
        });
        alert.present();
    }

    clickliste() {
        this.nav.setRoot('ListePage');



    }
    clickmap() {
        this.nav.setRoot(this.homePage, {
            userdata: this.userdata
        })
    }
    boolean = false
    clicksearch() {
        if (this.boolean == false) {
            this.boolean = true
            document.getElementById('pagesearch').style.display = "flex";
            document.getElementById('fond').style.display = "flex";
        }
        else {
            this.boolean = false
            document.getElementById('pagesearch').style.display = "none";
            document.getElementById('fond').style.display = "none";
        }

    }
    clickcarte() {
        this.nav.setRoot(this.cartePage, {
            userdata: this.userdata
        })
    }
    clickexit() {
        this.authenticationService.getUser()
            .then(
                (data) => {
                    this.loggedUser = true;
                    console.log(this.loggedUser);
                    this.nav.setRoot(this.decoPage, {
                        userdata: this.userdata
                    })


                },
                (error) => {
                    console.log(JSON.stringify(error));
                    this.loggedUser = false;
                    this.nav.setRoot(LoginPage);

                }


            );

    }
    clickfond() {
        this.boolean = false
        document.getElementById('pagesearch').style.display = "none";
        document.getElementById('fond').style.display = "none";
    }

    age = false;
    clickage() {
        if (this.age == false) {
            this.age = true
            this.categorie = false
            this.localisation = false

            document.getElementById('clickage').style.display = "flex";
            document.getElementById('clickage').style.transition = "1s";
            document.getElementById('clickcategorie').style.display = "none";
            document.getElementById('clicklocalisation').style.display = "none";
            this.tda = "block"
            this.lie = "none"
            this.test = "none"
        }
        else {
            this.age = false
            document.getElementById('clickage').style.display = "none";
            document.getElementById('clickage').style.transition = "1s";
            this.categorie = false
            this.localisation = false
            this.tda = "none"



        }


    }

    categorie = false
    clickcategorie() {
        if (this.categorie == false) {
            this.categorie = true
            this.age = false
            this.localisation = false
            document.getElementById('clickcategorie').style.display = "flex";
            document.getElementById('clickcategorie').style.transition = "1s";
            document.getElementById('clicklocalisation').style.display = "none";
            document.getElementById('clickage').style.display = "none";
            this.test = "block";
            this.tda = "none";
            this.lie = "none"
        }
        else {
            this.categorie = false
            this.age = false
            this.localisation = false
            document.getElementById('clickcategorie').style.display = "none";
            document.getElementById('clickcategorie').style.transition = "1s";
            this.test = "none";

        }


    }
    localisation = false
    clicklocalisation() {
        if (this.localisation == false) {
            this.localisation = true
            document.getElementById('clicklocalisation').style.display = "block";
            document.getElementById('clickcategorie').style.display = "none";
            document.getElementById('clickage').style.display = "none";
            document.getElementById('clicklocalisation').style.transition = "1s";
            this.lie = "block";
            this.test = "none";
            this.tda = "none";

        }
        else {
            this.categorie = false
            this.age = false
            this.localisation = false
            document.getElementById('clicklocalisation').style.display = "none";
            document.getElementById('clicklocalisation').style.transition = "1s";
            this.lie = "none";


        }
    }
    agesearch = false
    catsearch = false
    locsearch = false
    clickagesearch() {
        if (this.agesearch == false) {
            this.agesearch = true
            this.catsearch = false
            this.locsearch = false

            document.getElementById('clickag').style.height = "80px";
            document.getElementById('clickag').style.transition = "1s";
            document.getElementById('clickcategori').style.height = "0px";
            document.getElementById('clicklocalisatio').style.height = "0px";
        }
        else {
            this.agesearch = false
            document.getElementById('clickag').style.height = "0px";
            document.getElementById('clickag').style.transition = "1s";
            this.catsearch = false
            this.locsearch = false


        }


    }

    clickcatsearch() {
        if (this.catsearch == false) {
            this.catsearch = true
            this.agesearch = false
            this.locsearch = false
            document.getElementById('clickcategori').style.height = "80px";
            document.getElementById('clickcategori').style.transition = "1s";
            document.getElementById('clicklocalisatio').style.height = "0px";
            document.getElementById('clickag').style.height = "0px";


        }
        else {
            this.catsearch = false
            this.agesearch = false
            this.locsearch = false
            document.getElementById('clickcategori').style.height = "0px";
            document.getElementById('clickcategori').style.transition = "1s";
            ;
        }


    }

    clicklocsearch() {
        if (this.locsearch == false) {
            this.locsearch = true
            document.getElementById('clicklocalisatio').style.height = "80px";
            document.getElementById('clickcategori').style.height = "0px";
            document.getElementById('clickag').style.height = "0px";
            document.getElementById('clicklocalisatio').style.transition = "1s";
            document.getElementById('ploc').style.display = "block";

        }






















        else {
            this.catsearch = false
            this.agesearch = false
            this.locsearch = false
            document.getElementById('clicklocalisatio').style.height = "0px";
            document.getElementById('clicklocalisatio').style.transition = "1s";
            document.getElementById('ploc').style.display = "none";

        }

    }

    filter() {

        this.partenaire_display = this.partenaire.slice(); //copy array
        if (this.ageselected.length > 0) {
            // Pour chaque partenaire
            for (let i = this.partenaire_display.length - 1; i >= 0; i--) {
                var partenaires = this.partenaire_display[i]

                var find = false;

                // Pour chaque age coché
                for (let age of this.ageselected) {

                    let int_age = parseInt(age);

                    // Si on trouve au moins une fois l'age dans le tableau du partenaire
                    if (partenaires["tranche-dage"].indexOf(int_age) > -1) {
                        find = true;
                        break;
                    }

                }

                // Si aucune correspondance, on enlève l'élément du tableau
                if (!find) {
                    this.partenaire_display.splice(i, 1);
                }

            }
        }
        //categories
        // Pour chaque partenaire
        if (this.catselected.length > 0) {

            for (let i = this.partenaire_display.length - 1; i >= 0; i--) {

                var partenaires = this.partenaire_display[i];
                var find = false;

                // Pour chaque cat coché
                for (let cat of this.catselected) {

                    let int_cat = parseInt(cat);

                    // Si on trouve au moins une fois l'cat dans le tableau du partenaire
                    if (partenaires["type-activite"].indexOf(int_cat) > -1) {
                        console.log(partenaires["type-activite"]);

                        find = true;
                        break;
                    }

                }

                // Si aucune correspondance, on enlève l'élément du tableau
                if (!find) {
                    this.partenaire_display.splice(i, 1);
                }

            }

        }
        //lieu
        // Pour chaque partenaire
        if (this.lieuselected.length > 0) {

            for (let i = this.partenaire_display.length - 1; i >= 0; i--) {

                var partenaires = this.partenaire_display[i];
                var find = false;

                // Pour chaque lieu coché
                for (let lieu of this.lieuselected) {

                    let int_lieu = parseInt(lieu);

                    // Si on trouve au moins une fois l'lieu dans le tableau du partenaire
                    if (partenaires["zone-geographique"].indexOf(int_lieu) > -1) {
                        console.log(partenaires["zone-geographique"]);

                        find = true;
                        break;
                    }

                }

                // Si aucune correspondance, on enlève l'élément du tableau
                if (!find) {
                    this.partenaire_display.splice(i, 1);
                }

            }

        }
    }


    clickshow(partnerId, index) {

        /*
        let a: 1;
        let idvalue = 1 + test.path[1].id;
        this.idvalue = idvalue;
        this.show = true;
        document.getElementById(idvalue).style.display = "block";
        */

        console.log(this.partenaire_display[index]);

        let modal = this.modalCtrl.create('PlacePage', {
            place: this.partenaire_display[index],
        });
        modal.present();

        /*
        this.show = true;
        document.getElementById('show_' + partnerId).style.display = 'block';
        this.teste = true;
        */




    }

    fermer(id) {
        document.getElementById('show_' + id).style.display = 'none';
        //document.getElementById(this.idvalue).style.display = "none";
        this.teste = false
    }
}
