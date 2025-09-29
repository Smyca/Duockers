import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Capacitor, WebView } from '@capacitor/core';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@Capacitor/Preferences';
import { Platform } from '@ionic/angular';

export interface UserPhoto {
  filepath: string;
  WebViewPath?: string;
}


@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public photos: UserPhoto[] = [];
  private PHOTO_STORAGE: string = 'photos';
  private platform: Platform;



  constructor(platform: Platform) {
    this.platform = platform;
  }

  public async loadSaved() {
    const { value } = await Preferences.get({ key: this.PHOTO_STORAGE });
    this.photos = (value ? JSON.parse(value) : []) as UserPhoto[];

    // Display the photo by reading into base64 format
    if (!this.platform.is('hybrid')) {
      for (let photo of this.photos) {
        // Read each saved photo's data from the Filesystem
        const readFile = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });

        // Web platform only: Load the photo as base64 data

        photo.WebViewPath = `data:image/jpeg;base64,${readFile.data}`;
      }
    }

  }


  private convertBlobToBase64 = (blob: Blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = reject;
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.readAsDataURL(blob);
    });


  private async savePicture(photo: Photo) {
    const base64Data = await this.readAsBase64(photo);

    //escribe la data del archivo en el directorio

    const fileName = Date.now() + '.jpeg';
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });

    if (this.platform.is('hybrid')) {
      return {
        filepath: savedFile.uri,
        WebViewPath: Capacitor.convertFileSrc(savedFile.uri)
      };
    }
    else {
      return {
        filepath: fileName,
        webviewPath: photo.webPath
      }
    }

  }
  public async AgregarPhotoGaleria() {
    // Toma una foto
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 200
    });

    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);

    this.photos.unshift({
      filepath: "soon...",
      WebViewPath: capturedPhoto.webPath!

    });

    Preferences.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos),
    });


  }



  // ejecutar en función de la plataforma en la que se ejecuta la aplicación (web o móvil):
  private async readAsBase64(photo: Photo) {
    // "hybrid" will detect Cordova or Capacitor
    if (this.platform.is('hybrid')) {
      // Read the file into base64 format
      const file = await Filesystem.readFile({
        path: photo.path!
      });

      return file.data;
    }
    else {
      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath!);
      const blob = await response.blob();

      return await this.convertBlobToBase64(blob) as string;
    }
  }
}

