import { Component } from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams, ViewController} from 'ionic-angular';
import {AuthenticationService} from "../../services/authentication.service";
import {WordpressService} from "../../services/wordpress.service";
import {LaunchNavigator} from "@ionic-native/launch-navigator";
import {Geolocation} from "@ionic-native/geolocation";

/**
 * Generated class for the PlacePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-place',
  templateUrl: 'place.html',
})
export class PlacePage {

  place: any;
  user: any;
  voteInProgress: boolean = false;
  loggedUser: boolean = false;
  isEngaged: boolean = false;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public loadingCtrl: LoadingController,
      public viewCtrl: ViewController,
      public authenticationService: AuthenticationService,
      public wordpressService: WordpressService,
      public alertCtrl: AlertController,
      private launchNavigator: LaunchNavigator,
      public geolocation: Geolocation,
  ) {
      this.place = this.navParams.get('place');

      this.authenticationService.getUser()
          .then(
              (data) => {
                  //this.user

                  //console.log('USER');
                  //console.log(JSON.stringify(data));
                  this.loggedUser = true;

                  this.wordpressService.getSuscribeEndingDate(data.nicename).subscribe(response => {
                      console.log(JSON.stringify(response));
                      if (response.end_date !== false) {
                          this.isEngaged = true;
                      }
                  });
              },
              (error) => {
                  this.loggedUser = false;
                  console.log(this.loggedUser)
              }
          );
  }

  closePlace() {
    this.viewCtrl.dismiss();
  }

  iWasHere() {
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

              this.wordpressService.iWasHere(this.place.id, user.nicename).subscribe((response) => {
                  console.log(response);
                  if( response.status ) {
                      this.place.martygeocoderlatlng.simplefavorites_count = parseInt(this.place.martygeocoderlatlng.simplefavorites_count) + 1;
                  } else {
                      this.place.martygeocoderlatlng.simplefavorites_count = parseInt(this.place.martygeocoderlatlng.simplefavorites_count) - 1;
                  }
                  this.voteInProgress = false;
                  loading.dismiss();
              }, error => {
                  console.log(error);
                  console.log(JSON.stringify(error));
                  loading.dismiss();
              });
          }, error => {
              this.voteInProgress = false;
              loading.dismiss();
              this.error('Vous devez être connecté pour participer aux votes');
          });
  }

  goPlace() {
      var itemstring = this.place.martygeocoderlatlng.martygeocoderlatlng.toString();

      console.log(itemstring);

      itemstring = itemstring.replace(")", ""); //"{42.827682, 2.225718899999947"
      itemstring = itemstring.replace("(", ""); //"42.827682, 2.225718899999947"
      let splited = itemstring.split(","); // [ 42.827682, 2.225718899999947 ]
      let coords = {
          lat: parseFloat(splited[0]),
          lng: parseFloat(splited[1])
      };

      console.log(JSON.stringify(this.place));
      let locationOptions = {timeout: 3000, enableHighAccuracy: true, maximumAge: 3600};
      this.geolocation.getCurrentPosition(locationOptions).then(response => {

          console.log('coordonnées');
          console.log(JSON.stringify(response));

          this.launchNavigator.navigate([coords.lat, coords.lng], {
              //start: response.coords.latitude + ', ' + response.coords.longitude,
              start: [response.coords.latitude, response.coords.longitude],
              destinationName: this.place.title.rendered,
              appSelection: {
                  dialogHeaderText: "Sélectionnez une application pour l'itinéraire",
                  cancelButtonText: "Annuler",
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

  error(message) {
      let alert = this.alertCtrl.create({
          message: message,
          buttons: [
              {
                  text: 'OK',
                  handler: () => {}
              }
          ]
      });
      alert.present();
  }

}
