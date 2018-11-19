import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './products';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(public itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};
    for (let productId in itemsMap) {
      let item = itemsMap[productId];
      console.info(item, 'item');
      let x = new ShoppingCartItem();
      Object.assign(x, item);
      x.key = productId;
      this.items.push(x);
    }
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.items)  {
      count += this.items[productId].quantity;
    }
    return count;
  }

  get totalPrice() {
    let sum = 0;

    for(let productId in this.items) {
      sum += this.items[productId].totalPrice;
    }
    return sum;
  }

  getQuantity(product: Product) {
    let item = this.itemsMap[product.key];
    return item ? item.quantity : 0;
  }
}
