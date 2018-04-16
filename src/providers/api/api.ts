import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";
import {AuthService} from "../../services/auth";

@Injectable()

/**
 * Notre provider Principal
 */
export class ApiProvider {

  api_url = 'kids.serveur66.fr'+'wp-json/wp/v2/users/';

  constructor(public http: HttpClient) {
    console.log('Hello AuthProvider Provider');
  }
 
  postLogin(email, password){
    let data = {
      email: email,
      password: password
    };
 
    let headers = new HttpHeaders();
    headers.set('Content-Type', 'application/json');
    return this.http.post(this.api_url, data, {headers: headers});
  }
 
 }