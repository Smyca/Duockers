import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgottenPswdPageRoutingModule } from './forgotten-pswd-routing.module';

import { ForgottenPswdPage } from './forgotten-pswd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForgottenPswdPageRoutingModule
  ],
  declarations: [ForgottenPswdPage]
})
export class ForgottenPswdPageModule {}
