import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html'
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined; // <-- changed to @Input() to be passed to home.component.html for dynamic loop/render *ngFor
  @Output() addToCart = new EventEmitter(); // <-- communicate between child and parent component (event emitter)

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product); // <-- catches input via html invocation (click)
  } // <-- emit $event value up to parent through @output EventEmitter, eventually injected to cart w/ service

}
