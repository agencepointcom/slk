import { Injectable } from '@angular/core';
import {ApiProvider} from "../api/api";
import {HttpHeaders} from "@angular/common/http";

@Injectable()
export class AuthProvider {

  /**
   * Constructeur
   * @param {ApiProvider} api
   */
  constructor(public api: ApiProvider) {}

  /**
   * Permet de raffraichir le token utilisateur
   *
   * @returns {Observable<ArrayBuffer>}
   */
  refresh() {
    let headers = new HttpHeaders();
    //headers.set('Authorization', 'Bearer ' + token);
    return this.api.get('refresh', {
      //headers: headers
    });
  }

  /**
   * Requête de connexion
   *
   * @param email
   * @param password
   * @returns {Observable<Object>}
   */
  login(email, password) {
    return this.api.post('auth/connexion', {
      email: email,
      password: password
    });
  }

  /**
   * Requête d'inscription
   *
   * @param data
   * @returns {Observable<Object>}
   */
  register(data) {
    return this.api.post('auth/inscription', data);
  }

  /**
   * Requête pour récupérer les données de l'utilisateur courant
   *
   * @returns {Observable<Object>}
   */
  getAccountData() {
    return this.api.get('account');
  }

  /**
   * Mise à jour des données du compte
   *
   * @param data
   * @returns {Observable<Object>}
   */
  updateAccount(data) {
    return this.api.post('account/update', data);
  }

}
