import { Component } from '@angular/core';
import { HomePage } from '../home/home'
// import { RegisterPage } from '../register/register'
import { NavController, LoadingController, IonicPage } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
// import { WordpressService } from '../../services/wordpress.service';
import { AuthenticationService } from '../../services/authentication.service';
import { DecoPage } from '../deco/deco';
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

  constructor(
    public nav: NavController,
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    // public wordpressService: WordpressService,
    public authenticationService: AuthenticationService
  ) {}
  ionViewDidLoad() {
    this.authenticationService.getUser()
    .then(
      (data) => {
      this.loggedUser = true;
      console.log(this.loggedUser) ;
      this.navCtrl.setRoot(HomePage);


      },
      error => this.loggedUser = false
   
 
    ); 
 
    
   
    // this.callBDD( this.http)
  }


  ionViewWillLoad() {
    this.login_form = this.formBuilder.group({
      user_login: new FormControl('', Validators.compose([
        Validators.required
      ])),
      user_pass: new FormControl('', Validators.required)
    });
  }

  login(value){
    let loading = this.loadingCtrl.create();
    loading.present();
    console.log(value.user_login)
    console.log(value.user_pass)
    
   

    this.authenticationService.doLogin(value.user_login, value.user_pass)
    .subscribe(res => {

       this.authenticationService.setUser({
         token: res.json().token,
         username: value.user_login,
         displayname: res.json().user_display_name,
        
         email: res.json().user_email
       });
       this.boolean=true
       loading.dismiss();
       this.navCtrl.setRoot(HomePage);
     },
     err => {
       loading.dismiss();
       this.error_message = "Invalid credentials. Try with username 'aa' password 'aa'.";
       console.log(err);
     })
  }

  skipLogin(){
    this.navCtrl.setRoot(HomePage);
  }
  clickparcourir(){
    this.nav.setRoot('HomePage');
  }
  // goToRegister(){
  //   this.navCtrl.push(RegisterPage);
  // }
  

}
