import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { HomePageRoutingModule } from './home-routing.module';
import { TestModule } from '../test/test.module';  // Importa TestModule aquí
import { ApiConsumoService } from '../services/api-consumo.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    TestModule  // Importa TestModule para usar MenuTabsComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  providers:[ApiConsumoService],
  declarations: [HomePage]
})
export class HomePageModule {}
