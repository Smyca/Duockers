import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiltrarGentePage } from './filtrar-gente.page';

const routes: Routes = [
  {
    path: '',
    component: FiltrarGentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiltrarGentePageRoutingModule {}
