import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ShoppingCartService } from '../shared/services/shopping-cart.service';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart } from '../shared/models/shopping-cart';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products = [];
  filteredProducts;
  category;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {

  }

  async ngOnInit() {
    this.cart$ = (await this.shoppingCartService.getCart());

    this.populateProducts();
  }

  private populateProducts() {
    this.productService.getAll()
      .pipe(
        switchMap(products => {
          this.products = products;
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get('category');
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProducts = this.category ?
      this.products.filter(p => p.category === this.category) :
      this.products;
  }
}
