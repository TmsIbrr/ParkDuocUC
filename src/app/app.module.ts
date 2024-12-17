import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { RouteReuseStrategy } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// Importaciones de AngularFire
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { AngularFireAuthModule } from '@angular/fire/compat/auth'; 

registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), // Inicializar Firebase
    AngularFirestoreModule, // Importar Firestore
    AngularFireAuthModule // Importar módulo de autenticación
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
              { provide: LOCALE_ID, useValue: 'es' }],
  
  bootstrap: [AppComponent]
})
export class AppModule {}
