import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model'; // <-- model for onAddToCart
import { CartService } from 'src/app/services/cart.service';

const ROWS_HEIGHT: { [id:number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({ // <-- "component decorator"
  selector: 'app-home', // <-- css selector for how this component will be used in html
  templateUrl: './home.component.html', // rel-path to this component's html file (like JSX)
})
export class HomeComponent implements OnInit { // <-- typescript Class that defines component behavior
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;

  constructor(private cartService: CartService) { } // <-- inject Service to add to cart

  ngOnInit(): void {
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }

  onAddToCart(product: Product): void { // <-- receives value from (addToCart)="onAddToCart($event)" in <app-product-box> home.component.html...
    this.cartService.addToCart({ // <-- use service to parse received values, method defined in `cart.service.ts`
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
  }

}

// <-- below is an example of declaring multiple LifeCycle Hook method interfaces
// <-- for custom effects for each part of the LifeCycle, if these are not declared here
// <-- they can still be used inside the Class, but this provides more explicit
// <-- and intentional readability for the Class (the hook methods can still be written inside w/o)
// -------------------------------------------------------------------------------------------------
// export class MyComponent implements OnInit, OnDestroy, AfterViewInit {
//   /* Component code goes here */
// }
