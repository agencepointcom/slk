import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListePage } from './liste';

@NgModule({
  declarations: [
    ListePage,
  ],
  imports: [
    IonicPageModule.forChild(ListePage),
  ],
})
export class ListePageModule {}
