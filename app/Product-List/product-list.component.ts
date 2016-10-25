import { Product } from './../shared/Product';
import { ProductService } from './product.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'my-product-list',
  templateUrl: '/app/Product-List/productList.html',
  providers: [ProductService]
})
export class ProductListComponent {

  products: Product[];
  selectedProduct: Product;
  productLodding: boolean = true;

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.productLodding = true;
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProductsSlowly().then(products => this.products = products).then(() => this.productLodding = false);
  }

  onSelect(product: Product): void {
    this.selectedProduct = product;
  }

  add(name: string, category: string, price: string, description?: string): void {
    name = name.trim();
    category = category.trim();
    let price_num = parseInt(price.trim());
    description = description.trim();
    if (!name) { return; }
    this.productService.create(name, category, price_num, description)
      .then(product => {
        this.products.push(product);
        this.selectedProduct = null;
      });
  }

  delete(product: Product): void {
    this.productService
      .delete(product.id)
      .then(() => {
        this.products = this.products.filter(h => h !== product);
        if (this.selectedProduct === product) { this.selectedProduct = null; }
      });
  }
}