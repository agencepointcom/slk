import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DecoPage } from './deco';

@NgModule({
  declarations: [
    DecoPage,
  ],
  imports: [
    IonicPageModule.forChild(DecoPage),
  ],
})
export class DecoPageModule {}
