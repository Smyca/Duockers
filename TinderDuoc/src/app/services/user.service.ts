import { Injectable } from '@angular/core';
import {getAuth ,Auth,signOut,createUserWithEmailAndPassword,signInWithEmailAndPassword} from '@angular/fire/auth';
import { Firestore,collection, addDoc, collectionData } from '@angular/fire/firestore';
import User from '../interfaces/user.interface'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: string | null | undefined 

  constructor(private auth: Auth,
              private firestore: Firestore
  ) { }


  register({email,password}:any){
    return createUserWithEmailAndPassword(this.auth,email,password)
    

  }
  
  login({email,password}:any){
    return signInWithEmailAndPassword(this.auth,email,password)
  }

  logout(){
    return signOut(this.auth);
  }

 
  getUser(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const user = getAuth().currentUser;
      const noUser='Error username'
      if (user) {
        resolve(user.displayName); // Usuario encontrado
      } else {
        reject(noUser); // Usuario no encontrado
      }
    });
  }



addUser(user: Partial<User>){
  const userRef= collection(this.firestore, 'usuarios')
  return addDoc(userRef, user)
  .then((user)=>{
    console.log("IUD DE USER: ",user.id)
  })
}




getAllUser(): Observable<User[]>{
    const userCollection=collection(this.firestore,'usuarios')
    return collectionData(userCollection,{idField:'id'}) as Observable<User[]>
}







 

}
