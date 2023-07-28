import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model'; // <-- model for onAddToCart
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: { [id:number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({ // <-- "component decorator"
  selector: 'app-home', // <-- css selector for how this component will be used in html
  templateUrl: './home.component.html', // rel-path to this component's html file (like JSX)
})
export class HomeComponent implements OnInit, OnDestroy { // <-- typescript Class that defines component behavior
  cols = 3;
  rowHeight = ROWS_HEIGHT[this.cols];
  category: string | undefined;
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12'; // TODO: <-- limit?
  productSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private storeService: StoreService) { } // <-- inject Service to add to cart

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.productSubscription = this.storeService.getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      });
  }

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  // TODO: add a way to clear category (need html, event, fn, and invoke service getAllCategories())

  onAddToCart(product: Product): void { // <-- receives value from (addToCart)="onAddToCart($event)" in <app-product-box> home.component.html...
    this.cartService.addToCart({ // <-- use service to parse received values, method defined in `cart.service.ts`
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id
    });
  }

  ngOnDestroy(): void {
    if (this.productSubscription) {
      this.productSubscription.unsubscribe();
    }
  }

  onItemsCountChange(newCount: number): void {
    this.count = newCount.toString(); // <-- changes "state" of count
    this.getProducts(); // <-- fetches all products again with updated params
  }

  onSortChange(newSort: string):void {
    this.sort = newSort;
    this.getProducts()
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
