import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'calculatePrice'})
export class calculatePrice implements PipeTransform {
     transform(value: number, quantity: string): number{
            let qan = parseFloat(quantity);
            return value * qan;
     }
}