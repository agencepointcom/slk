import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";
import {AuthService} from "../../services/auth";

@Injectable()

/**
 * Notre provider Principal
 */
export class ApiProvider {

  //  URL de notre API en ligne
  private apiUrl: string = 'http://localhost:8000/api3/api/';

  /**
   * Constructeur
   *
   * @param {HttpClient} http
   * @param {Storage} storage
   * @param {AuthService} authService
   */
  constructor(public http: HttpClient, public storage: Storage, public authService: AuthService) {
  }

  /**
   * Requête get prenant en compte une fin d'url et des paramètres
   *
   * @param endpoint
   * @param params
   * @returns {Observable<Object>}
   */
  get(endpoint, params ?: any) {

    //let headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.authService.getToken());

    return this.http.get(this.apiUrl + endpoint, {
      params: params,
      //headers: headers,
    });
  }

  /**
   * Requête POST
   *
   * @param endpoint
   * @param body
   * @param options
   * @returns {Observable<ArrayBuffer>}
   */
  post(endpoint, body, options ?: any) {
    return this.http.post(this.apiUrl + endpoint, body, options);
  }

  /**
   * Requête PUT
   *
   * @param endpoint
   * @param body
   * @param options
   * @returns {Observable<ArrayBuffer>}
   */
  put(endpoint, body, options ?: any) {
    return this.http.put(this.apiUrl + endpoint, body, options);
  }

  /**
   * Requête DELETE
   *
   * @param endpoint
   * @param body
   * @returns {Observable<Object>}
   */
  delete(endpoint, body) {
    return this.http.delete(this.apiUrl + endpoint);
  }

  /**
   * Requête PATCH
   *
   * @param endpoint
   * @param body
   * @returns {Observable<Object>}
   */
  patch(endpoint, body) {
    return this.http.patch(this.apiUrl + endpoint, body);
  }

}
