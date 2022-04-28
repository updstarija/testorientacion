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
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent implements OnInit {
  cont:any;
  usuario:any={};
  carreras:any[];  
  idx:any;  
  order: string = 'prioridad';
  constructor(public rtDB: AngularFireDatabase, public firestore: AngularFirestore,
    private afAuth:AngularFireAuth,public toastr: ToastrManager,
    private router:Router) { }
 
  ngOnInit(): void {
    this.cont=1;
    this.afAuth.user.subscribe((u:any)=>{
      this.obtenerUsuario(u.uid).subscribe(o=>{
        if(o.nombres){
          this.usuario=o;
          if(o.calificado){
            this.carreras=Object.values(o.resultados_carreras);
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
  
  verificar(carrera){
    var carrerasupds = ["Derecho", 
                 "Ingeniería Comercial", 
                 "Administración de Empresas", 
                 "Contaduría Pública",
                 "Psicología",
                 "C. Comunicación Social",
                 "Ingeniería de Sistemas",
                 "Ingeniería Civil",
                 "Ingeniería Industrial",
                 "Ingeniería en Gestión Petrolera",
                 "Ingeniería en Gestión Ambiental",
                 "Ingeniería en Redes y Telecomunicaciones"];
    var sw = carrerasupds.includes(carrera);
    return sw;
  }
  sortBy(prop: string) {
    return this.carreras.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
  }
  activar(carrera){
    var carrerasupds = ["Derecho", 
                 "Ingeniería Comercial", 
                 "Administración de Empresas", 
                 "Contaduría Pública",
                 "Psicología",
                 "C. Comunicación Social",
                 "Ingeniería de Sistemas",
                 "Ingeniería Civil",
                 "Ingeniería Industrial",
                 "Ingeniería en Gestión Petrolera",
                 "Ingeniería en Gestión Ambiental",
                 "Ingeniería en Redes y Telecomunicaciones"];                 
      this.idx = carrerasupds.indexOf(carrera);
      localStorage.setItem('idx', this.idx.toString());      
    return this.idx;
  }

  tips_next() {
    let now = new Date();
    console.log(now);
    if(this.cont<8)
    {
      this.cont++; 
    }    
  }
  tips_back() {
    /* if(this.cont>0)
    { */
      this.cont--; 
    /* } */
  }
}
