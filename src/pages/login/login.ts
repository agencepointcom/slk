import { Component } from '@angular/core';
import { HomePage } from '../home/home'
// import { RegisterPage } from '../register/register'
import { NavController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
// import { WordpressService } from '../../services/wordpress.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  login_form: FormGroup;
  error_message: string;

  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    // public wordpressService: WordpressService,
    public authenticationService: AuthenticationService
  ) {}

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

    this.authenticationService.doLogin(value.user_login, value.user_pass)
    .subscribe(res => {

       this.authenticationService.setUser({
         token: res.json().token,
         user_login: value.user_login,
         email: res.json().user_email
       });

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

  // goToRegister(){
  //   this.navCtrl.push(RegisterPage);
  // }

}
