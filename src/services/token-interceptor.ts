import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {AuthService} from "./auth";

@Injectable()

/**
 * Cette classe nous permet d'ajouter des éléments à nos requêtes
 * à la volée, de sorte que ça soit transparent dans notre développement
 */
export class TokenInterceptor implements HttpInterceptor {

  /**
   * Constructeur
   * @param {AuthService} authService
   */
  constructor(public authService: AuthService) {
    console.log(this.authService.getToken());
  }

  /**
   * Fonction d'interception des requêtes
   *
   * @param {HttpRequest<any>} request
   * @param {HttpHandler} next
   * @returns {Observable<HttpEvent<any>>}
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable <HttpEvent <any> > {

    //  On clone la requête interceptée, et on lui rajoute notre header d'autorisation (token)
    request = request.clone({
      setHeaders: {
        Authorization: 'Bearer ' + this.authService.getToken()
      }
    });

    //  On retourne notre requête comme si de rien n'était
    return next.handle(request).do((event: HttpEvent <any>) => {
      if( event instanceof HttpResponse ) {
        /**
         * Pour pousser le vice, on pourrait imaginer un cache ici pour stocker certains
         * résultats de page, pour économiser notre application.
         */
      }
    }, error => {
      if( error instanceof  HttpErrorResponse ) {
        if( error.status === 401 ) {
          /**
           * On pourrait prévoir des pages d'erreurs personnalisés pour éviter les plantages
           */
        }
      }
    });
  }
}
