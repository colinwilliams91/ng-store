import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model'; // <-- import Cart model to be used accross app
import { MatSnackBar } from '@angular/material/snack-bar';
// used `ng g s cart` to init this service file (services are how we export a class w/ methods)
// import manually into app.module.ts and inject into `providers` array

@Injectable({
  providedIn: 'root'
}) // cart `BehaviorSubject` can now be subscribed to
export class CartService { // across app and used to update items: [], receive new values and update the U/I
  cart = new BehaviorSubject<Cart>({ items: [] }) // <-- holds initial value (like useState({ items: [] }))
  constructor(private _snackBar: MatSnackBar) { } // `service` that displays information to the user that has been added

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items] // <-- holds onto previous cart to add more like React State writes

    const itemInCart = items.find((_item => _item.id === item.id)); // <-- grab item if exists in cart already...
    if (itemInCart) {
      itemInCart.quantity++; // increment
    } else {
      items.push(item); // add to cart
    }

    this.cart.next({ items }) // <-- { items: items }
    this._snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 }); // <-- display args for 3 seconds to U/I
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;
    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;

        if (_item.quantity === 0) {
          itemForRemoval = item;
        }
      }

      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }

    this.cart.next({ items: filteredItems });
    this._snackBar.open('1 item removed from cart.', 'Ok', { duration: 3000 });
  }

  getTotal(items: Array<CartItem>): number {
    return items
    .map((item) => item.price * item.quantity)
    .reduce((prev, cur) => prev + cur, 0)
  }

  clearCart(): void {
    this.cart.next({ items: [] }); // <-- empties cart array
    this._snackBar.open('Cart is cleared.', 'Ok', { duration: 3000 }); // <-- display
  }

  removeFromCart(item: CartItem, update = true): Array<CartItem> {
    const filteredItems = this.cart.value.items.filter((_item) => _item.id !== item.id);

    if (update) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open('1 item removed from cart.', 'Ok', { duration: 3000 });
    }
    return filteredItems;
  }
}
