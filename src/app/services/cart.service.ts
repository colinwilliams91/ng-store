import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model'; // <-- import Cart model to be used accross app
import { MatSnackBar } from '@angular/material/snack-bar';
// used `ng g s cart` to init this service file
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
    console.log(this.cart.value);

  }

}
