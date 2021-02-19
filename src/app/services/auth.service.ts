import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators'
import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth,
              private fireStore: AngularFirestore) { }

  initAuthListener(){
    this.auth.authState.subscribe( fuser=>{
      console.log(fuser);
    });
  }


  crearUsuario(nombre: string, correo: string, password: string){

    //usando la destructuracion.
   // console.log({nombre, correo, password});

   return this.auth.createUserWithEmailAndPassword(correo, password)
              .then(({user})=>{

                const newUser = new Usuario(user.uid, nombre, user.email)

               return this.fireStore.doc(`${user.uid}/usuario`).set({...newUser})
              })

  }


  loginUsuario(usuario: string, password: string){

    return this.auth.signInWithEmailAndPassword(usuario, password);
  }

  logOut(){
  return this.auth.signOut();
  }


 isAuth(){
  return this.auth.authState.pipe(
    map(fbUser => fbUser != null)
  );
 }
}
