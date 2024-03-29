import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cart: Cart = { items: [{
    product: 'https://via.placeholder.com/150',
    name: 'Logitech G Pro Mouse',
    price: 150,
    quantity: 1,
    id: 1,
  },
  {
    product: 'https://via.placeholder.com/150',
    name: 'Logitech G Pro Mouse',
    price: 150,
    quantity: 1,
    id: 2,
  }]};

  dataSource: Array<CartItem> = [];
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action'
  ];

  constructor(private cartService: CartService, private http: HttpClient) { } // <-- CartService class (service) with `.getTotal()`

  ngOnInit(): void {  // <-- store in local storage to persist thru refresh? session?
    this.cartService.cart.subscribe((_cart: Cart) => { // <-- subscribe to cart to update cart page
      this.cart = _cart;
      this.dataSource = this.cart.items;
    });
  }

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items); // <-- from `cart.service.ts` received in constructor
  }

  onClearcart(): void {
    this.cartService.clearCart();
  }

  onRemoveFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item);
  }

  onAddQuantity(item: CartItem):void {
    this.cartService.addToCart(item);
  }

  onRemoveQuantity(item: CartItem):void {
    this.cartService.removeQuantity(item);
  }
  // TODO: move "publishable key" STRIPE API key to .env
  onCheckout(): void {
    this.http.post('http://localhost:4242/checkout', {
      items: this.cart.items
    }).subscribe(async (res: any) => {
      // <-- stripe developer dashboard API keys: "publishable key"
      let stripe = await loadStripe('pk_test_51NZ3VfDHtd9HD34XmilRuBujv2RmwfZhD1GwMw1X7QeC4v9FwJKChcBnZNeBDgkh5PtEqGWQRROhWNK8uMfQ2Caa00RyFSulj4');
      stripe?.redirectToCheckout({
        sessionId: res.id
      })
    });
  }

}
