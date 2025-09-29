import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';  // Importa IonicModule
import { RouterModule } from '@angular/router';  // Importa RouterModule
import { MenuTabsComponent } from '../menu-tabs/menu-tabs.component';

@NgModule({
  declarations: [MenuTabsComponent],
  imports: [
    CommonModule,
    IonicModule,  // Asegúrate de que IonicModule esté aquí
    RouterModule  // Asegúrate de que RouterModule esté aquí
  ],
  exports: [MenuTabsComponent]
})
export class TestModule {}
