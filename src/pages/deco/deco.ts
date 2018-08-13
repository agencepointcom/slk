import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationService } from '../../services/authentication.service';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { CartePage } from '../carte/carte';
import { ListePage } from '../liste/liste';

/**
 * Generated class for the DecoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deco',
  templateUrl: 'deco.html',
})
export class DecoPage {
  userdata: any;
  homePage: any;
  cartePage: any;
  ListPage: any


  constructor(public nav: NavController,
    public navParams: NavParams,
    public authenticationService: AuthenticationService,
  ) {
    this.userdata = navParams.data.userdata;
    this.homePage = HomePage
    this.cartePage = CartePage
    this.ListPage = ListePage
  }

  ionViewDidLoad() {
    this.authenticationService.logOut()
      .then(
        res => this.nav.push(LoginPage),
        err => console.log('Error in log out')
      )
    this.nav.setRoot(this.ListPage, {
    })
  }
  logOut() {
    this.authenticationService.logOut()
      .then(
        res => this.nav.push(LoginPage),
        err => console.log('Error in log out')
      )
  }
  clickliste() {
    this.nav.setRoot(this.ListPage, {
      userdata: this.userdata
    })


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

    this.nav.setRoot('LoginPage');

  }
}
