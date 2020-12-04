import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  i: number = 0;
  uid: string;
  items:Array<any> = [];
  itemDetails:Array<any> = [];

  constructor(private afAuth: AngularFireAuth, private router:Router, private afStore: AngularFirestore) { 
    this.afAuth.authState.subscribe(data => this.addData(data));
  }

  addData(data) {
    if(data) {
      this.uid = data.uid;
      this.getCartItems(this.uid);
      this.getOrderItems(this.uid);
      return;
    } else {
      this.router.navigate(['/home'])
    }
  }

  getCartItems(uid) {
    return new Promise((resolve, reject) => {
      this.afStore.collection('cart', ref => ref.where('uid', '==', uid)).snapshotChanges().subscribe(data => this.addCart(data))
    })
  }

  getOrderItems(uid) {
    return new Promise((resolve, reject) => {
      this.afStore.collection('orders', ref => ref.where('uid', '==', uid)).snapshotChanges().subscribe(data => this.addOrder(data))
    })
  }

  addCart(data) {
    this.i = data.length;
  }

  addOrder(data) {
    this.items = [];
    this.itemDetails = [];
    data.map(value => {
      this.items.push({id: value.payload.doc.id, ...value.payload.doc.data()});
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

  ngOnInit() {
  }

}
