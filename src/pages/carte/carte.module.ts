import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartePage } from './carte';

@NgModule({
  declarations: [
    CartePage,
  ],
  imports: [
    IonicPageModule.forChild(CartePage),
  ],
})
export class CartePageModule {}
