import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdressPageRoutingModule } from './adress-routing.module';

import { AdressPage } from './adress.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdressPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdressPage]
})
export class AdressPageModule {}
