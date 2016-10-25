import { calculatePrice } from './calculatePrice.pipe';
import { ProductService } from './../Product-List/product.service';
import { Product } from '../shared/Product';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'my-product-detail',
  templateUrl: '/app/Product-Detail/productDetail.html',
  providers: [ProductService]
})

export class ProductDetailComponent implements OnInit {
  @Input()
  product: Product;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      let id = +params['id'];
      this.productService.getProduct(id).then(product => this.product = product);
    });
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.productService.update(this.product)
      .then(() => this.goBack());
  }
}