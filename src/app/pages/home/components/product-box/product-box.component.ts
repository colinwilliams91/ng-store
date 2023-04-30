import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  templateUrl: './product-box.component.html'
})
export class ProductBoxComponent implements OnInit {
  @Input() fullWidthMode = false;
  product: Product | undefined = {
    id: 1,
    title: 'Mouse Pad',
    price: 50,
    category: 'peripherals',
    description: 'Description',
    image: 'https://via.placeholder.com/150'
  };
  @Output() addToCart = new EventEmitter(); // <-- communicate between child and parent component (event emitter)

  constructor() { }

  ngOnInit(): void {
  }

  onAddToCart(): void {
    this.addToCart.emit(this.product); // <-- catches input via html invocation (click)
  } // <-- emit $event value up to parent through @output EventEmitter, eventually injected to cart w/ service

}
