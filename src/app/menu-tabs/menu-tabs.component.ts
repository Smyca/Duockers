import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu-tabs',
  templateUrl: './menu-tabs.component.html',
  styleUrls: ['./menu-tabs.component.scss'],
})
export class MenuTabsComponent  implements OnInit {

  constructor(
    private userService: UserService,
    private navCtrl: NavController

  ) { }

  ngOnInit() {}


  goExit(){
    this.userService.logout()
    .then(()=>{
      console.log('onclick cerrar sesion')
      this.navCtrl.navigateRoot(['/sign-in']);
    })
    .catch(error=>console.log(error))
  }

  goHome(){
    this.navCtrl.navigateRoot(['/home']);

  }

  goPerfil(){
    this.navCtrl.navigateRoot(['/perfil']);
  }

  goMensajes(){
    this.navCtrl.navigateRoot(['/mensajes']);
  }

}
