import { Component, Input } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map(item => item.quantity)
      .reduce((acc, cur) => acc + cur, 0)
  }

  constructor(private cartService: CartService) { } // <-- "private" = only use this service inside our class component
  // <-- if we want to use above service in our html omit `private`
  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items); // <-- from `cart.service.ts` received in constructor
  }

  onClearCart() { // <-- empties cart and emits
    this.cartService.clearCart();
  }

}
