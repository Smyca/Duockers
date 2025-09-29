import { Component, OnInit } from '@angular/core';
import { ApiConsumoService } from '../services/api-consumo.service';
import { NavController } from '@ionic/angular';
import { Auth } from '@angular/fire/auth';
import { UserService } from '../services/user.service';
import User from '../interfaces/user.interface';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  users: User[] = [];
  user: string | null | undefined;
  username: string | null | undefined;


  datos: any
  dataStorage: any
  data: any
  constructor(private apiService: ApiConsumoService,
    private navCtrl: NavController,
    private useService: UserService,
    private auth: Auth) { }

  ngOnInit() {

    const user = this.auth.currentUser
    
    this.username = user?.displayName
    console.log(this.username)
    this.allUsers();



    // //uso de persistencia
    // this.dataStorage = localStorage.getItem('data')
    // if (this.dataStorage) {
    //   console.log('datos desde localstorage')
    //   this.datos = JSON.parse(this.dataStorage)

    // } else {

    //   this.apiService.obtenerDatos().subscribe((Info) => {
    //     console.log('datos desde API')
    //     console.log(Info)
    //     localStorage.setItem('data', JSON.stringify(this.datos))

    //   })
    // }

  }

  allUsers() {
    this.useService.getAllUser().subscribe((users => {
      this.users = users
      // console.log('Funcion allUsers(): ',this.users)

    }))
  }




  Filtrar() {
    this.navCtrl.navigateRoot('/editar-perfil');
  }





}
