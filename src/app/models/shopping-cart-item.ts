import { Product } from './products';

export class ShoppingCartItem {
  key: string;
  title: string;
  imageUrl: string;
  price: number;

  get totalPrice() {
    return this.price * this.quantity;
  }
}
