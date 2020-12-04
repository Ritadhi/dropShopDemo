import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { FireService } from '../fire.service';
import firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required)
  })
  
  authorized: boolean = false;

  constructor(public alertController: AlertController, private authService: FireService, private afAuth: AngularFireAuth, private router:Router, private afStore: AngularFirestore) { 
    this.afAuth.authState.subscribe(data => this.addData(data));
  }

  addData(data) {
    if(data) {
      this.authorized = true;
    } else {
      this.authorized = false;
    }
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.loginForm.controls.email.value, this.loginForm.controls.password.value).then((data) => {
      if(data) {
        this.router.navigate(['/home']);
      }
    }).catch((error) => {
    })
  }

  
  cart() {
    if(this.authorized) {
      this.router.navigate(['/cart']);
    } else {
      this.presentAlert();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: 'Please login to continue to cart',
      buttons: ['OK']
    });

    await alert.present();
  }

}
