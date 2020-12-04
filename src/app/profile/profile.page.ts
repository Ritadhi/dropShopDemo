import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  name:string;
  email:string;
  uid:string;
  i: number = 0;

  constructor(private afAuth: AngularFireAuth, private router:Router, private afStore: AngularFirestore) {
    this.afAuth.authState.subscribe(data => this.addData(data));
  }

  addData(data) {
    if(data) {
      this.email = data.email;
      this.uid = data.uid;
      this.getCartItems(this.uid);
      this.afStore.collection('users', ref => ref.where('uid', '==', this.uid).limit(1)).valueChanges({uid: this.uid}).subscribe(data => this.addName(data));
    } else {
      this.router.navigate(['/home'])
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

  addName(data) {
    this.name = data[0].name;
  }

  ngOnInit() {
  }

}
