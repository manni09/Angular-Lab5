import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Product } from './../shared/Product';

import 'rxjs/add/operator/toPromise';


@Injectable()
export class ProductService {

    private productUrl = 'app/products';  // URL to web api
    private headers = new Headers({ 'Content-Type': 'application/json' });


    constructor(private http: Http) { }

    getProducts(): Promise<Product[]> {
        return this.http.get(this.productUrl).toPromise().then(res => res.json().data as Product[]).catch(this.handleError);
    }

    getProductsSlowly(): Promise<Product[]> {
        return new Promise<Product[]>(resolve => setTimeout(resolve, 2000)).then(() => this.getProducts());
    }

    getProduct(id: number): Promise<Product> {
        return this.getProducts().then(Products => Products.find(Product => Product.id === id));
    }

    update(product: Product): Promise<Product> {
        const url = `${this.productUrl}/${product.id}`;
        return this.http
            .put(url, JSON.stringify(product), { headers: this.headers })
            .toPromise()
            .then(() => product)
            .catch(this.handleError);
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    create(name: string, category: string, price: number, description?: string): Promise<Product> {
        return this.http
            .post(this.productUrl, JSON.stringify({ name: name, category: category, description: description, price: price }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<void> {
        const url = `${this.productUrl}/${id}`;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }
}