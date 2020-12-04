import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FireService } from '../fire.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  signupForm: FormGroup = new FormGroup ({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    firstname: new FormControl(null, Validators.required),
    lastname: new FormControl(null, Validators.required)
  })

  authorized: boolean = false;

  constructor(public alertController: AlertController, private authService: FireService, private router: Router, private afAuth: AngularFireAuth) {
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

  signup() {
    this.authService.signup(this.signupForm.controls.email.value, this.signupForm.controls.password.value, this.signupForm.controls.firstname.value, this.signupForm.controls.lastname.value).then((data) => {
      this.create(data);

    }).catch((error) => {
      this.preAlert(error);
    })
  }

  create(data) {
    this.authService.createUser(this.signupForm.controls.email.value, this.signupForm.controls.password.value, this.signupForm.controls.firstname.value, this.signupForm.controls.lastname.value, data.user.uid);
    this.presentAlert();
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: 'Regitered succesfully',
      buttons: [						{
        text: 'Ok',
        handler: () => {
        this.router.navigate(['/login']);
        }
      }]
    });

    await alert.present();
  }

  async preAlert(message) {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: message.message,
      buttons: ['Ok']
    });

    await alert.present();
  }

  cart() {
    if(this.authorized) {
      this.router.navigate(['/cart']);
    } else {
      this.cartAlert();
    }
  }

  async cartAlert() {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: 'Please login to continue to cart',
      buttons: ['OK']
    });

    await alert.present();
  }

}
