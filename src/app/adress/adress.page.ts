import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FireService } from '../fire.service';

@Component({
  selector: 'app-adress',
  templateUrl: './adress.page.html',
  styleUrls: ['./adress.page.scss'],
})
export class AdressPage implements OnInit {

  @Input() cartId: string;
  @Input() totalValue: string;
  @Input() uid: string;
  @Input() productId: string;
  @Input() price: string;
  @Input() productName: string;
  @Input() image: string;

  addressForm:FormGroup = new FormGroup ({
    address: new FormControl(null, Validators.required)
  })

  constructor(private modalCtrl: ModalController, private router: Router, private auth: FireService) { }

  ngOnInit() {
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true
    });
    
  }

  buy() {
    this.auth.createOrder(this.uid, this.productId, this.totalValue[0], this.totalValue[1], this.addressForm.controls.address.value);
    this.auth.removeFromCart(this.cartId); 
    this.dismiss();
    this.router.navigate(['/orders']);
  }

}
