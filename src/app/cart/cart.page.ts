import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { all } from 'q';
import { FireService } from '../fire.service';
import { ModalController } from '@ionic/angular';
import { AdressPage } from '../adress/adress.page';
// import {map} from 'rxjs/operators';

// export interface Users {};
// export interface UsersId extends Users { id:}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {

  uid:string;
  items:Array<any> = [];
  itemDetails:Array<any> = [];
  number:Array<any> = [];

  constructor(private modal: ModalController, private afAuth: AngularFireAuth, private router:Router, private afStore: AngularFirestore, private auth: FireService) {
    this.afAuth.authState.subscribe(data => this.addData(data));
    // this.afStore.collection('users').snapshotChanges().subscribe(data => {this.add(data)})
  }

  addData(data) {
    if(data) {
      this.uid = data.uid;
      this.getCartItems(this.uid);
      return;
    } else {
      this.router.navigate(['/home'])
    }
  }

  // add(data) {
  //   // data.map(value => {
  //   //   console.log({id: value.payload.doc.id, ...value.payload.doc.data()});
  //   // })
  // }

  ngOnInit() {
  }

  getCartItems(uid) {
    return new Promise((resolve, reject) => {
      this.afStore.collection('cart', ref => ref.where('uid', '==', uid)).snapshotChanges().subscribe(data => this.addCart(data))
    })
  }

  addCart(data) {
    // console.log(data)
    this.items = [];
    this.itemDetails = [];
    this.number = [];
    data.map(value => {
      this.items.push({id: value.payload.doc.id, ...value.payload.doc.data()});
      this.number.push(value.payload.doc.data().totalValue[0]);
      // console.log(this.items.length)
    })
    this.addAll(0);
  }

  addAll(x) {
    // console.log(this.items);
    if(x < this.items.length) {
      // this.addAll(x+1);
      this.afStore.collection('products').doc(this.items[x].productId).valueChanges().subscribe(data => this.addItemDetails(data, x));
    }
    
  }

  addItemDetails(data, x) {
    var item = this.itemDetails.concat(data);
    this.itemDetails = item;
    this.addAll(x+1)
  }

  addValue(i) {
    // this.n = 0;
    this.number[i]++;
    this.auth.editCart(this.items[i].id, this.number[i], this.items[i].totalValue[1]);
    // this.number.map(val => {if(val > 0) {this.n++}})
  }

  remove(i) {
    // this.n = 0;
    this.number[i]--;
    this.auth.editCart(this.items[i].id, this.number[i], this.items[i].totalValue[1]);
    // this.number.map(val => {if(val > 0) {this.n++}})
  }

  delete(i) {
    if(i != -1) {
      // this.items.splice(i, 1);
      // this.itemDetails.splice(i, 1);
      // this.number.splice(i, 1); 
      this.auth.removeFromCart(this.items[i].id); 
    }
  }

  buy(i) {
    this.presentModal(i);
  }

  async presentModal(i) {
    const modal = await this.modal.create({
      component: AdressPage,
      componentProps: {
        'cartId': this.items[i].id,
        'totalValue': this.items[i].totalValue,
        'uid': this.uid,
        'productId': this.items[i].productId,
        'price': this.number[i]*this.items[i].totalValue[1],
        'productName': this.itemDetails[i].name,
        'image': this.itemDetails[i].coverImage
      }
    });
    return await modal.present();
  }

}
