import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { PrincipalComponent } from './pages/principal/principal.component';
import { TextInputAutocompleteModule } from 'angular-text-input-autocomplete';
import { AuthGuard } from './guard/auth-guard';
import { ResultadosComponent } from './pages/resultados/resultados.component';
import { ToastrModule } from 'ng6-toastr-notifications';
import { ContactosComponent } from './pages/contactos/contactos.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

const config = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyAzAdYf0g9JpmlSys65jyP2KaDTo8_-OG0',
    authDomain: 'upds-test.firebaseapp.com',
    databaseURL: 'https://upds-test.firebaseio.com',
    projectId: 'upds-test',
    storageBucket: 'upds-test.appspot.com',
    messagingSenderId: '1040806628187',
    appId: '1:1040806628187:web:7e75b7dee969c69a0d287e',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    RegistroComponent,
    PrincipalComponent,
    ResultadosComponent,
    ContactosComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    TextInputAutocompleteModule,
    AngularFireModule.initializeApp(config.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireMessagingModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    AuthGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
