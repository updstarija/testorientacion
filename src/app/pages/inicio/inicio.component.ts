import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { auth } from 'firebase/app';
import { map, first } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from '@angular/fire/firestore';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  constructor(
    private router:Router,
    private afAuth:AngularFireAuth,
    public firestore: AngularFirestore
  ) { }

  ngOnInit(): void {
  }
  registro(){
      
  }
  AuthLogin() {
    var provider=new auth.FacebookAuthProvider();
    return this.afAuth.signInWithPopup(provider)
    .then((result) => {
      if(result.user){
        this.obtenerUsuario(result.user.uid).subscribe((u:any)=>{
          console.log(u);
          if(u.nombres){
            this.router.navigate(['/principal']); 
          }else{
            this.router.navigate(['/registro']); 
          }
        })
      }
    }).catch((error) => {
        //console.log(error)
    })
  }
  AuthGoogle(){
    var provider = new auth.GoogleAuthProvider();
    return this.afAuth.signInWithPopup(provider).then(result=>{
      if(result.user){
        this.obtenerUsuario(result.user.uid).subscribe((u:any)=>{
          console.log(u);
          if(u.nombres){
            this.router.navigate(['/principal']); 
          }else{
            this.router.navigate(['/registro']); 
          }
        })
      }
    })
  }
  obtenerUsuario(key){
    return this.firestore.doc('usuarios/'+key).snapshotChanges().pipe(map((a: any) => {
      return { key: a.payload.id, ...a.payload.data() };
    }))
  }
}
