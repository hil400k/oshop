import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category.service';
import { ProductService } from '../../product.service';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$;

  constructor(
    private categoryService: CategoryService,
    private productService: ProductService
  ) {
    this.categories$ = categoryService.getAll();
  }

  save(product) {
    this.productService.create(product);
  }

  ngOnInit() {
  }

}
