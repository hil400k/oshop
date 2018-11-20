import { Component, OnDestroy, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';
import { Subscription } from 'rxjs';
import { OrderService } from '../order.service';
import { AuthService } from '../auth.service';
import { st } from '@angular/core/src/render3';
import { Order } from '../models/order';
import { Router } from '@angular/router';

@Component({
  selector: 'check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy {
  shipping = {};
  cart: ShoppingCart;
  subscription: Subscription;
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private shoppingCart: ShoppingCartService,
    private orderService: OrderService,
    private authService: AuthService
  ) {

  }

  async ngOnInit() {
    const cart$ = await this.shoppingCart.getCart();
    this.subscription = cart$.subscribe(cart => this.cart = cart);
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    const x = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(x);
    this.router.navigate(['order-success', result.key]);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
}
