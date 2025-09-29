import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForgottenPswdPage } from './forgotten-pswd.page';

const routes: Routes = [
  {
    path: '',
    component: ForgottenPswdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForgottenPswdPageRoutingModule {}
