import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'

// var firebase = require('firebase/app');

let firebaseConfig = {
  apiKey: "AIzaSyAnJ5dadt7JQOQeO2YSRbbrYmUNPVDocYU",
  authDomain: "dropshop-demo-488ad.firebaseapp.com",
  projectId: "dropshop-demo-488ad",
  storageBucket: "dropshop-demo-488ad.appspot.com",
  messagingSenderId: "685249300930",
  appId: "1:685249300930:web:daafe8022029c1fa556e5b"
};
// firebase.initializeApp(firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ReactiveFormsModule, FormsModule, AngularFireModule.initializeApp(firebaseConfig), AngularFirestoreModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
