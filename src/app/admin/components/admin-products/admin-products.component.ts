import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Subscription } from 'rxjs';
import { Product } from '../../../shared/models/products';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: Product[];
  subscription: Subscription;

  constructor(
    private productService: ProductService
  ) {
    this.subscription = this.productService.getAll()
      .subscribe((products: Product[]) => {

        this.filteredProducts = this.products = products;
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  filter(query: string) {
    this.filteredProducts = query ? this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) : this.products;
  }

}
