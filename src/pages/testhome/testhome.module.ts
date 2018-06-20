import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TesthomePage } from './testhome';

@NgModule({
  declarations: [
    TesthomePage,
  ],
  imports: [
    IonicPageModule.forChild(TesthomePage),
  ],
})
export class TesthomePageModule {}
