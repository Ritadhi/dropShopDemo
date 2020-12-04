import { Injectable } from '@angular/core';
import firebase from 'firebase/app';
import 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

interface user {
  email: string,
  uid: string
}

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore) { }

  login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  createUser(email: string, password: string, first_name: string, last_name: string, uid: string) {
    return this.afStore.collection('users').add({
      name: first_name + " " + last_name,
      password: password,
      email: email,
      uid: uid
    });
  }

  addToCart(productId, uid, number, price) {
    return this.afStore.collection('cart').add({
      productId: productId,
      uid: uid,
      totalValue: [number, price]
    })
  }

  editCart(id, number, price) {
    this.afStore.collection('cart').doc(id).update({totalValue: [number, price]});
  }

  removeFromCart(id) {
    this.afStore.collection('cart').doc(id).delete();
  }

  createOrder(uid, productId, number, price, address) {
    return this.afStore.collection('orders').add({
      productId: productId,
      uid: uid,
      totalValue: [number, price],
      address: address,
      orderDate: Date.now(),
      status: 'Processing'
    })
  }

  signup(email: string, password: string, first_name: string, last_name: string) {
    return new Promise((resolve, reject) => {

      this.afAuth.createUserWithEmailAndPassword(email, password).then((response) => {
        this.createUser(email, password, first_name, last_name, response.user.uid);
        resolve(response);
      }).catch((error) => {
        reject(error);
      })

    })
  }

  logOut() {
    return new Promise((resolve, reject) => {
      this.afAuth.signOut().then((response) => {
      }).catch((error) => {
        reject(error);
      })
    })
  }

}


