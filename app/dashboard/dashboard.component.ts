import { ProductService } from './../Product-List/product.service';
import { Product } from './../shared/Product';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'my-dashboard',
    templateUrl: '/app/dashboard/dashboard.template.html',
    providers: [ProductService]
})

export class DashboardComponent implements OnInit {

    products: Product[] = [];

    constructor(private router: Router, private productService: ProductService) {
    }

    ngOnInit(): void {
        this.productService.getProducts().then(products => this.products = products.slice(1, 5));
    }

    gotoDetail(product: Product) {
        let link = ['/product/detail', product.id];
        this.router.navigate(link);
    }
}