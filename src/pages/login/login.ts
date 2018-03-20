import { Component } from '@angular/core';
import {App, Events, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
;

import { AuthProvider } from '../../providers/auth/auth';
import { AuthService } from '../../services/auth';
import * as AppConfig from "../../app/app.config";


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public config;

  //  Notre groupe d'inputs (à l'intérieur de <form>)
  public loginData: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public authProvider: AuthProvider, public toastCtrl: ToastController, public authService: AuthService, public app: App) {
    this.config = AppConfig.config;

    //  On définit des règles de validation
    this.loginData = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])]
    });
  }

  /**
   * Chargement des données avant même que la page ne soit affichée
   */
  ionViewCanEnter() {
    //  On vérifie que notre utilisateur n'est pas déjà connecté
    this.authService.checkAuthentified().then(auth => {
      if( auth ) {
        //  Il est connecté ! Direction l'accueil
        this.app.getRootNavs()[0].setRoot('HomePage');
      }
    });
  }

  /**
   * Direction la page d'inscription
   */
  goToRegister() {
    this.navCtrl.setRoot('RegisterPage');
  }

  /**
   * Soumission du formulaire de connexion
   */
  submitLogin() {
    //  Envoi des données vers notre API
    this.authProvider.login(this.loginData.value.email, this.loginData.value.password).subscribe(response => {
      if( response['success'] ) {   //  Connexion réussie

        //  On sauvegarde toutes les données utiles en local (token + id de l'utilisateur)
        this.authService.storeCredentials(response['token'], response['user'].id).then(() => {
          //  Direction la page d'accueil après sauvegarde des données
          this.app.getRootNavs()[0].setRoot('HomeTabsPage');
        });
      } else {    //  Echec de connexion

        //  On affiche un message d'erreur
        let toast = this.toastCtrl.create({
          message: response['error'],
          cssClass: 'toast-danger',
          duration: 3000,
        });

        //  EN production, on vibre
        if( this.config.prod ) {
    
        }
        toast.present();
      }
    }, error => {
      console.log(error);
    });
  }

}
