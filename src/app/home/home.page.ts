import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { FireService } from '../fire.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  authorized: boolean = false;
  products: Array<any> = [];
  number: Array<any> = [];
  uid: string;
  n: number = 0;
  i: number = 0;

  constructor(private afAuth: AngularFireAuth, private router: Router, private alertController: AlertController, private afStore: AngularFirestore, private auth: FireService) {
    this.afAuth.authState.subscribe(data => this.addData(data));
    this.afStore.collection('products').snapshotChanges().subscribe(data => this.addProducts(data));
  }

  addProducts(data) {
    this.products = [];
    this.number = [];
    data.map(value => {
      this.products.push({id: value.payload.doc.id, ...value.payload.doc.data()});
      this.number.push([0]);
    })
  }

  addData(data) {
    if(data) {
      this.authorized = true;
      this.uid = data.uid;
      this.getCartItems(this.uid);
    } else {
      this.authorized = false;
    }
  }

  cart(message) {
    if(this.authorized) {
      this.router.navigate(['/cart']);
    } else {
      this.presentAlert(message);
    }
  }

  getCartItems(uid) {
    return new Promise((resolve, reject) => {
      this.afStore.collection('cart', ref => ref.where('uid', '==', uid)).snapshotChanges().subscribe(data => this.addCart(data))
    })
  }

  addCart(data) {
    this.i = data.length;
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: '',
      subHeader: '',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  add(i) {
    this.n = 0;
    this.number[i]++;
    this.number.map(val => {if(val > 0) {this.n++}})
  }

  remove(i) {
    this.n = 0;
    this.number[i]--;
    this.number.map(val => {if(val > 0) {this.n++}})
  }

  ionViewWillLeave() {
    this.n = 0;
    for(var i=0; i<this.number.length; i++) {
      if(this.number[i] > 0) {
        this.auth.addToCart(this.products[i].id, this.uid, this.number[i], this.products[i].price);
      }
      this.number[i] = 0;
    }
  }

}
