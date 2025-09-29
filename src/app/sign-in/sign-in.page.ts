import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  formLogin: FormGroup;
  usuarioEmail: string = '';
  password: string = '';
  cuentas: any[] = [];

  constructor(
    private alertController: AlertController,
    private userService: UserService,
    private navCtrl: NavController,
    private http: HttpClient,
    ) {

      this.formLogin=new FormGroup({
        email: new FormControl(),
        password: new FormControl()
      })
    }

 


    onSubmit(){

      console.log(this.formLogin.value); 
        this.userService.login(this.formLogin.value)
        .then(response =>{
          this.navCtrl.navigateRoot(['/home'])
          // console.log(response)
          // console.log('FUNCIONA')
        })
        .catch(async error => {
          console.log(error);
    
          
          const alert = await this.alertController.create({
            header: 'Error',
            message: 'Usuario o contraseña incorrectos. ',
            buttons: ['Aceptar'],
            cssClass: 'custom-alert-message'
          });
    
          await alert.present();
        }
      );
    }



  

  
  // IniciarSesion(){
  //   const cuentaValida = this.cuentas.find(cuenta =>
  //     cuenta['USUARIO'] === this.usuarioEmail && cuenta['CONTRASENA'] === this.password
  //   );

  //   if (!cuentaValida) {
  //     alert('USUARIO O CONTRASEÑA ERRONEAS');
  //   } else {

  //     localStorage.setItem('userID', cuentaValida['ID USUARIO']);
  //     console.log(cuentaValida['ID USUARIO'])
  //     this.navCtrl.navigateRoot(['/home']);

  //   }
  // }

  ngOnInit() {
    // this.cuentasDuoc().subscribe(res => {
    //   this.cuentas = res.data;  
    //   console.log("Cuentas cargadas:", this.cuentas);
    // });

  }
  
  // cuentasDuoc(){

  //   return this.http
  //   .get('../../assets/files/cuentasDuoc.json')
  //   .pipe(
  //     map((res:any) =>{
  //       console.log(res)
  //       return res;
  //     })
  //   )
  // }

}
