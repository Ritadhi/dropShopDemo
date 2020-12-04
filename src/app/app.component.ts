import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ActivatedRoute, Router } from '@angular/router';
import { FireService } from './fire.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  logged: boolean = false;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private aRoute: ActivatedRoute,
    private auth: FireService,
    private router:Router,
    private afAuth: AngularFireAuth
  ) {
    this.initializeApp();
    this.afAuth.authState.subscribe(data => this.addData(data));
  }

  addData(data) {
    if(data) {
      this.logged = true;
    } else {
      this.logged = false;
    }
  }

  data: Array<any>;

  setUrl=""

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  setPage() {
    this.setUrl = this.aRoute.snapshot.firstChild.url[0].path;
  }

  logout() {
    this.auth.logOut();
  }

}
