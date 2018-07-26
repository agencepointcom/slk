import { Component } from '@angular/core';
import { HomePage } from '../home/home'
// import { RegisterPage } from '../register/register'
import { NavController, LoadingController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
// import { WordpressService } from '../../services/wordpress.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Observable } from 'rxjs/Observable';
import { WordpressService } from '../../services/wordpress.service';


import { CartePage } from '../carte/carte';
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login_form: FormGroup;
  error_message: string;
boolean=false;
loggedUser: boolean=false;
user: string;
  users: string;
display: string;
  cartepage: any;

  constructor(
    public nav: NavController,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public wordpressService: WordpressService,
    public authenticationService: AuthenticationService,

  
  ) {this.cartepage= CartePage}
  ionViewDidLoad() {
    this.authenticationService.getUser()
    .then(
      (data) => {
        console.log(data)


      this.loggedUser = true;
      console.log(this.loggedUser) ;
      this.navCtrl.setRoot(HomePage);
        console.log(this.users)
      console.log(this.display)
      data.user_display_name

      },
      error => this.loggedUser = false
   
 
    ); 
 
    
   
    // this.callBDD( this.http)
  }
  ionViewWillEnter() {
  Observable.forkJoin(
    this.getUser()).subscribe(data=> {
      for( let i = 0; i <= data.length; i++){
        let item = data[0][i];

        this.user= item.name;
        console.log(item)
      }
    
    })
  }
  ionViewWillLoad() {
    this.login_form = this.formBuilder.group({
      user_login: new FormControl('', Validators.compose([
        Validators.required
      ])),
      user_pass: new FormControl('', Validators.required)
    });
  }
  getUser(){
    return this.wordpressService.getAuthor(this.user);

  }
  login(value){
    let loading = this.loadingCtrl.create();
    loading.present();
    this.users= value.user_login
    console.log(value.user_login)
    console.log(value.user_pass)
    
   
//autentification 
    this.authenticationService.doLogin(value.user_login, value.user_pass)
    .subscribe(res => {

       this.authenticationService.setUser({
         token: res.json().token,
         username: value.user_login,
        displayname: res.json().user_display_name,
     
         email: res.json().user_email
       });
       this.display= res.json().user_display_name
     
       this.navCtrl.push(this.cartepage,{
         userdata : res.json().user_display_name
       });
       
       console.log( res.json().user_display_name)
       this.boolean=true
       loading.dismiss();
       console.log(res)
     },
     err => {
       loading.dismiss();
       this.error_message = "Mot de passe ou nom invalide.";
       console.log(err);
     })
  }

  skipLogin(){
    this.navCtrl.setRoot(CartePage);
  }

  clickparcourir(){

    this.nav.setRoot('CartePage');
  }
  // goToRegister(){
  //   this.navCtrl.push(RegisterPage);
  // }
  
tutoriel(){
  this.nav.setRoot('TesthomePage');
}


}
