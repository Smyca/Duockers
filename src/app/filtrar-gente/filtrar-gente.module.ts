import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltrarGentePageRoutingModule } from './filtrar-gente-routing.module';

import { FiltrarGentePage } from './filtrar-gente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltrarGentePageRoutingModule
  ],
  declarations: [FiltrarGentePage]
})
export class FiltrarGentePageModule {}
