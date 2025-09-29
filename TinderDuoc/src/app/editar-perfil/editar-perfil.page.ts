import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../services/photo.service';
import { UserService } from '../services/user.service';
@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {

  user:string|undefined|null

  profilePhoto: string | undefined;
  constructor(public photoService: PhotoService,
              private userService: UserService
  ) {
   }

  async ngOnInit() {

     this.userService.getUser()
     .then(user=> {

      this.user=user

      console.log(user)
     }).catch(user=>{

      this.user=user
      console.log(user)
    })

    
  }

  addPhotoToGallery(){
    console.log("Funciona")
    this.photoService.AgregarPhotoGaleria();
  }

}
