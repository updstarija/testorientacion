import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import {AuthGuard } from './guard/auth-guard';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { ContactosComponent } from './pages/contactos/contactos.component';

const routes: Routes = [
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '*', redirectTo: '/inicio', pathMatch: 'full' },
  { path: 'inicio', component: InicioComponent},
  { path: 'registro', component: RegistroComponent,canActivate: [AuthGuard] },
  { path: 'principal', component: PrincipalComponent,canActivate: [AuthGuard] },
  { path: 'resultados', component: ResultadosComponent,canActivate: [AuthGuard] },
  { path: 'contactos', component: ContactosComponent,canActivate: [AuthGuard] },
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
