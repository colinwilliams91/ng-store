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

  constructor(private cartService: CartService) { } // <-- "private" = only use this service inside our component, not the html

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }

}
