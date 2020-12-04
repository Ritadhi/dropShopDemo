import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdressPage } from './adress.page';

const routes: Routes = [
  {
    path: '',
    component: AdressPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdressPageRoutingModule {}
