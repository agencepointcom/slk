import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ConfigServiceTsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConfigServiceTsProvider {

  constructor(public http: HttpClient) {
    this.getlistes();
  }
 getlistes():Observable<any>{
   return this.http.get("http://localhost:8100/bdd_wp.php");
  
 }
}
