import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup } from '@angular/forms';
import { collection, Firestore, getDocs, query, where } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import User from '../interfaces/user.interface';
@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  username: string | undefined | null
  userID: string | null = null
  formGroup: FormGroup
  profilePhoto: string | undefined;
  users: User[] = []




  constructor(public photoService: PhotoService,
    private userService: UserService,
    private firestore: Firestore,
    private auth: Auth
  ) {
    this.formGroup = new FormGroup({
      username: new FormControl(),
      name: new FormControl(),
      age: new FormControl(),
      carrera: new FormControl(),
      description: new FormControl(),
    })
  }


  async ngOnInit() {

    const userData = this.auth.currentUser
    const userID = userData?.uid

    //Llama a la informacion total del usuario actual, con patchValue
    //se muestran losvalores que corresponden a cada input
    this.userService.getDatosUser(userID ?? 'userID')
      .then((response) => {
        console.log('ID de coleccion: ', response.id)
        const users = response.data() as User
        console.log('users: ', users)
        if (users) {
          this.formGroup.patchValue({
            username: users.username,
            name: users.name,
            age: users.age,
            carrera: users.carrera,
            description: users.description
          });
        }


      })
      .catch(() => {
        console.log('error de ejecucion')
      })






  }




  addPhotoToGallery() {
    console.log("Funciona")
    this.photoService.AgregarPhotoGaleria();
  }








  updateUser() {

    const userID = this.auth.currentUser?.uid; // Obtiene el ID del campo 

    if (!userID) {
      console.log('Error: No se pudo obtener el UID del usuario actual.');


      return; // Salir si no hay UID

    }


    const updatedUserData = this.formGroup.value;
    this.userService.updateUser(userID, updatedUserData)

  }








}
