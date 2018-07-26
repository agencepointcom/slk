import { Component, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ActionSheetController, AlertController, App, LoadingController, NavController, Platform, ToastController, IonicPage } from 'ionic-angular';
import { Slides } from 'ionic-angular';


declare var google: any;
declare var MarkerClusterer: any;
@IonicPage()

@Component({
  selector: 'page-testhome',
  templateUrl: 'testhome.html',
})
export class TesthomePage {
  constructor(
    public nav: NavController,
  
  
  ) {}
  @ViewChild(Slides) slides: Slides;

  goToSlide() {
    this.slides.slideTo(2, 500);
  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }
  home(){
    this.nav.setRoot('LoginPage');

  }
    }

  
