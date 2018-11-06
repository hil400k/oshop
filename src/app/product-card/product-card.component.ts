import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/products';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: any;
  @Input('show-actions') showActions: any = true;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit() {
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

}
