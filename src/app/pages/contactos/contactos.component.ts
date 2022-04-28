import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, QueryFn as QueryFnRealtime } from '@angular/fire/database';
import { map, first } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, QueryFn} from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';
declare var $: any;
@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.css']
})
export class ContactosComponent implements OnInit {

  usuario:any={};
  constructor(public rtDB: AngularFireDatabase, public firestore: AngularFirestore,
    private afAuth:AngularFireAuth,public toastr: ToastrManager,
    private router:Router) { }

  ngOnInit(): void {
    this.afAuth.user.subscribe((u:any)=>{
      this.obtenerUsuario(u.uid).subscribe(o=>{
        if(o.nombres){
          this.usuario=o;
          if(o.calificado){
            
          }
        }
        else{
          this.router.navigate(['/inicio']); 
        }
      })
    }) 
  }

  obtenerUsuario(key){
    return this.firestore.doc('usuarios/'+key).snapshotChanges().pipe(map((a: any) => {
      return { key: a.payload.id, ...a.payload.data() };
    }))
  }
  salir(){
    this.afAuth.signOut().then(()=>{
      $("#ModalSalir").modal('hide');
      this.router.navigate(['/inicio']); 
    })
  }

}
