import { Product } from '../shared/Product';
import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: '/app/core/app.template.html',
    styles: ["/styles.css"]
})

export class AppComponent { 
    title = 'Test Product';
}
