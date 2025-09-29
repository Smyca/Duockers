import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { PhotoService } from '../services/photo.service';
import { UserService } from '../services/user.service';
import { Auth, getAuth} from '@angular/fire/auth';
import User from '../interfaces/user.interface'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  cuentas: any[] = [];
  userID: string|null=null
  user: string | null | undefined;
  apellido: string = '';
  descripcion:  string | null = null;
  edad: string = '';
  users: User|null=null

  constructor(
    private navCtrl: NavController,
    private http: HttpClient,
    public photoService: PhotoService,
    private userService: UserService,
    private auth:Auth
  ) { }

  ngOnInit() {

    const user=this.auth.currentUser
    const userID=user?.uid

    this.userService.getDatosUser(userID??'userID')
    .then(response=>{
      this.users = response.data() as User
      
      console.log('this.users:',this.users)
    

    
    })
 
    // this.cuentasDuoc().subscribe(res => {
    //   this.cuentas = res.data;
    //   // this.traerNombre();
    // });

  }

  traerNombre() {
    const userID = localStorage.getItem("userID");
    if (userID) {
      const cuenta = this.cuentas.find(cuenta =>
        cuenta['ID USUARIO'] === Number(userID)
      );

      if (cuenta) {
        // console.log("Usuario encontrado:", cuenta);
        this.apellido = cuenta['APELLIDO']
        this.descripcion = cuenta['DESCRIPCION']
        this.edad = cuenta['EDAD']
      }
    }
  }

  EditarPerfil() {
    this.navCtrl.navigateRoot('/editar-perfil');
  }
  CompartirPerfil() {
    this.navCtrl.navigateRoot('/home')
  }

  cuentasDuoc() {
    return this.http
      .get('../../assets/files/cuentasDuoc.json')
      .pipe(
        map((res: any) => {
          // console.log(res);
          return res;
        })
      );
  }


}
