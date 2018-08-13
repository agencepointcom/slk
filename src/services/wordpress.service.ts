import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import * as Config from '../config';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@Injectable()
export class WordpressService {
  constructor(public http: Http){}
//recuperer les postes recent 
  getRecentPosts(categoryId:number, page:number = 1){
    let category_url = categoryId? ("&categories=" + categoryId): "";

    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + 'posts?page=' + page
      + category_url)
    .map(res => res.json());
  }
  //recuperer activité
  getActivites(activite){
    return this.http.get(Config.WORDPRESS_REST_API_URL + "type-activite/?per_page=100" )
    .map(res => res.json());
  }
  //recuperer age 
  getAge(age){
    return this.http.get(Config.WORDPRESS_REST_API_URL + "tranche-dage/" )
    .map(res => res.json());
  }

  getLieu(lieu){
    return this.http.get(Config.WORDPRESS_REST_API_URL + "zone-geographique/" )
    .map(res => res.json());
  }
  getPartenaire(partenaire){
    return this.http.get(Config.WORDPRESS_REST_API_URL + "activite?per_page=100" )
    .map(res => res.json());
  }

  getImage(image_id){
    return this.http.get(Config.WORDPRESS_REST_API_URL + "media/" + image_id )
    .map(res => res.json());
  }
  getComments(postId:number, page:number = 1){
    return this.http.get(
      Config.WORDPRESS_REST_API_URL
      + "comments?post=" + postId
      + '&page=' + page)
    .map(res => res.json());
  }

  getAuthor(user){
    return this.http.get(Config.WORDPRESS_REST_API_URL + "users/" )
    .map(res => res.json());
  }

  getPostCategories(post){
    let observableBatch = [];

    post.categories.forEach(category => {
      observableBatch.push(this.getCategory(category));
    });

    return Observable.forkJoin(observableBatch);
  }

  getCategory(category){
    return this.http.get(Config.WORDPRESS_REST_API_URL + "categories/" + category)
    .map(res => res.json());
  }

  createComment(postId, user, comment){
    let header: Headers = new Headers();
    header.append('Authorization', 'Bearer ' + user.token);

    return this.http.post(Config.WORDPRESS_REST_API_URL + "comments?token=" + user.token, {
      author_name: user.displayname,
      author_email: user.email,
      post: postId,
      content: comment
    },{ headers: header })
    .map(res => res.json());
  }
  updateActivites( martygeocoderlatlng){
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    return this.http.put(Config.WORDPRESS_REST_API_URL + "activite?per_page=100/",{
      partenaire_favoris: martygeocoderlatlng.simplefavorites_count
    },{ headers: header } )
    .map(res => res.json());
  }
}