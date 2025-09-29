import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { updateProfile } from '@angular/fire/auth';
import User from '../interfaces/user.interface';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {


  formReg: FormGroup
  cuentas: any[] = [];
  usuario: string = '';
  correoElectronico: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private toastController: ToastController,
    private http: HttpClient,
    private userService: UserService) {
    this.formReg = new FormGroup({
      user: new FormControl(),
      email: new FormControl(),
      password: new FormControl()

    })
  }

  ngOnInit() {
    this.cuentasDuoc().subscribe(res => {
      this.cuentas = res.data;
      console.log("Cuentas cargadas:", this.cuentas);
    });
  }


  onSubmit() {

    const cuentaValida = this.cuentas.find(cuenta =>
      cuenta['USUARIO'] === this.usuario || cuenta['CORREO ELECTRONICO'].toUpperCase() === this.correoElectronico.toUpperCase()
    );

    /////////     SE VALIDA SI ALGUN CAMPO ESTA VACIO       /////////
    if (!this.usuario || !this.correoElectronico || !this.password) {
      alert('Complete todos los campos');
      return;
    }

    /////////       SE VALIDA SI EL USUARIO EXISTE          /////////
    else if (!this.correoElectronico.endsWith('@duocuc.cl')) {
      this.alertaDominioInvalido();
      return;

    } else if (cuentaValida) {
      alert('Usuario y/o Correo electronico ya usados');

    }


    else {
      //EMAIL Y CONTRASEÑA ENVIADOS COMO OBJETO AL SERVICIO DE REGISTRO
      const { email, password } = this.formReg.value;
      this.userService.register({ email, password })
        .then(response => {
          const user = response.user
          console.log('response.user: ', user)


          updateProfile(user, {


            displayName: this.usuario

          })
            .then(() => {

              //datos parciales para completar algunos campos
              const userData: Partial<User> = {
                id: user.uid,
                name:'',
                username: user.displayName,
                email: user.email,
                age: 0 ,
                carrera:'',
                description:'',
                photo:'',
                role:''

              };

              this.userService.addUser(userData)
                .then(() => {
                  console.log("Usuario agregado!")
                })
                .catch((error) => {
                  console.log("Usuario no agregado!", error)

                })

              console.log("USUARIO ha sido agregado como", this.usuario)
            })
            .catch((error) => {
              console.log("error al agregar usuario", error)

            })


          this.navCtrl.navigateRoot(['/sign-in']);

        })
        .catch(error => { console.log(error) });
    }
  }

  async alertaDominioInvalido() {
    const toast = await this.toastController.create({
      message: 'Correo debe pertenecer a DUOC',
      duration: 1500,
      position: 'top'

    })
    await toast.present();
  }

  // async alertaRegistroExitoso(){
  //   const toast=await this.toastController.create({
  //     header: 'Registro Exitoso',
  //     message:'Registrado con exito!',
  //     buttons: [
  //       {
  //         text: 'Aceptar',
  //         handler: () => {
  //           // Navegar a la página de inicio de sesión al aceptar la alerta
  //           this.navCtrl.navigateRoot(['/sign-in']);
  //         }
  //       }
  //     ]

  //   })
  //   await toast.present();
  // }




  crearCuenta() {


    console.log('Button crear cuenta')
    //this.navCtrl.navigateRoot('/home')
  }


  cuentasDuoc() {

    return this.http
      .get('../../assets/files/cuentasDuoc.json')
      .pipe(
        map((res: any) => {
          console.log(res)
          return res;
        })
      )
  }
}
