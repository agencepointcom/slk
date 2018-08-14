import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthenticationService } from '../../services/authentication.service';
import { DecoPage } from '../deco/deco';
import { LoginPage } from '../login/login';
import { WordpressService } from '../../services/wordpress.service';
import { Observable } from 'rxjs/Observable';
import * as moment from 'moment';
import { HomePage } from '../home/home';
import { ListePage } from '../liste/liste';


/**
 * Generated class for the CartePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-carte',
  templateUrl: 'carte.html',
})
export class CartePage {
  myDate: any
  user: string;
  loggedUser: boolean = false;
  activite: Array<any> = new Array<any>();
  lieu: Array<any> = new Array<any>();
  tdage: Array<any> = new Array<any>();
  display: any;
  userdata: string
  caca: string
  listPage: any;
  homepage: any;
  decopage: typeof DecoPage;
  cartePage: any;
  boolean: boolean = false;

  constructor(public nav: NavController, public navParams: NavParams,
    public authenticationService: AuthenticationService,
    public wordpressService: WordpressService
  ) {
    this.listPage = ListePage;
    this.homepage = HomePage;
    this.decopage = DecoPage;
    this.userdata = navParams.data.userdata;
    this.cartePage = CartePage;
    console.log(this.userdata);
  }

  ionViewWillEnter() {
    this.myDate = moment(moment().format(), moment.ISO_8601).format();

    setInterval(() => {
      this.myDate = moment(moment().format(), moment.ISO_8601).format();
    }, 100);

    this.authenticationService.getUser()
      .then(
        (data) => {
          this.user
          console.log(data)
          this.loggedUser = true;
          console.log(this.loggedUser);
          document.getElementById('divpopup').style.display = "none";
          document.getElementById('fond').style.display = "none";
          document.getElementById('fondnouser').style.display = "none";
          this.userdata = this.navParams.data.userdata;


        },
        (error) => {
          this.loggedUser = false;
          console.log(this.loggedUser)

        }
      );


    console.log('ionViewDidLoad ListePage');


    Observable.forkJoin(
      this.getActivite()).subscribe(data => {
        for (let i = 0; i <= data.length; i++) {
          let item = data[0][i];

          this.activite.push(item.name);
        }

      })
    Observable.forkJoin(
      this.getUser()).subscribe(data => {
        for (let i = 0; i <= data.length; i++) {
          let item = data[0][i];

          this.user = item.name;
          console.log(item)
        }

      })
    Observable.forkJoin(
      this.getLieu()).subscribe(data => {
        for (let i = 0; i <= data.length; i++) {
          let item = data[0][i];

          this.lieu.push(item.name);
          console.log(item.name)
        }

      })
    Observable.forkJoin(
      this.getAge()).subscribe(data => {
        for (let i = 0; i <= data.length; i++) {
          let item = data[0][i];

          this.tdage.push(item.name);
        }

      })

  }

  getActivite() {

    return this.wordpressService.getActivites(this.activite);

  }

  getLieu() {

    return this.wordpressService.getLieu(this.lieu);

  }
  getUser() {
    return this.wordpressService.getAuthor(this.user);

  }


  getAge() {

    return this.wordpressService.getAge(this.tdage);

  }


  afficher() {

  }
  clickliste() {
    this.nav.setRoot(this.listPage, {
      userdata: this.userdata
    });



  }
  clickmap() {
    this.nav.setRoot(this.homepage, {
      userdata: this.userdata
    });
  }
  //boolean = false
  // clicksearch(){
  //   if(this.boolean==false){
  //   this.boolean=true
  //   document.getElementById('pagesearch').style.display = "flex";
  //   document.getElementById('fond').style.display = "flex";
  //   }
  //   else{
  //     this.boolean=false
  //     document.getElementById('pagesearch').style.display = "none";
  //     document.getElementById('fond').style.display = "none";
  //   }

  // }

  clickexit() {
    this.authenticationService.getUser()
      .then(
        (data) => {
          this.loggedUser = true;
          console.log(this.loggedUser);
          this.nav.push(this.decopage, {
            userdata: this.userdata
          });
        },
        (error) => {
          console.log(JSON.stringify(error));
        this.loggedUser = false;
          this.nav.setRoot(LoginPage);

        }


      );
  }


  clickfond() {
    this.boolean = false
    document.getElementById('pagesearch').style.display = "none";
    document.getElementById('fond').style.display = "none";
  }
  agesearch = false;
  catsearch = false;
  locsearch = false;
  clickagesearch() {
    console.log('trolololo')
    if (this.agesearch == false) {
      this.agesearch = true
      this.catsearch = false
      this.locsearch = false

      document.getElementById('clickag').style.height = "80px";
      document.getElementById('clickag').style.transition = "1s";
      document.getElementById('clickcategori').style.height = "0px";
      document.getElementById('clicklocalisatio').style.height = "0px";
    }
    else {
      this.agesearch = false
      document.getElementById('clickag').style.height = "0px";
      document.getElementById('clickag').style.transition = "1s";
      this.catsearch = false
      this.locsearch = false


    }


  }

  clickcatsearch() {
    if (this.catsearch == false) {
      this.catsearch = true
      this.agesearch = false
      this.locsearch = false
      document.getElementById('clickcategori').style.height = "80px";
      document.getElementById('clickcategori').style.transition = "1s";
      document.getElementById('clicklocalisatio').style.height = "0px";
      document.getElementById('clickag').style.height = "0px";


    }
    else {
      this.catsearch = false
      this.agesearch = false
      this.locsearch = false
      document.getElementById('clickcategori').style.height = "0px";
      document.getElementById('clickcategori').style.transition = "1s";
      ;
    }


  }

  clicklocsearch() {
    if (this.locsearch == false) {
      this.locsearch = true
      document.getElementById('clicklocalisatio').style.height = "80px";
      document.getElementById('clickcategori').style.height = "0px";
      document.getElementById('clickag').style.height = "0px";
      document.getElementById('clicklocalisatio').style.transition = "1s";
      document.getElementById('ploc').style.display = "block";

    }
    else {
      this.catsearch = false
      this.agesearch = false
      this.locsearch = false
      document.getElementById('clicklocalisatio').style.height = "0px";
      document.getElementById('clicklocalisatio').style.transition = "1s";
      document.getElementById('ploc').style.display = "none";

    }

  }

    /**
     * Fonction manquante
     */
    clickcarte() {

        this.nav.setRoot(this.cartePage, {
            userdata: this.userdata
        })
    }
}

