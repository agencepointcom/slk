import { Injectable } from '@angular/core';
import {ApiProvider} from "../api/api";
import {HttpHeaders, HttpClient} from "@angular/common/http";

@Injectable()
export class AuthProvider {

  api_url = 'http://kids.serveur66.fr/'+'wp-json/wp/v2/users/';

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