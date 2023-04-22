import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component'; /* <-- import component to route */
import { CartComponent } from './pages/cart/cart.component';

const routes: Routes = [{ /* pass objects in Routes array */
  path: 'home', /* <-- route path name */
  component: HomeComponent /* <-- exported component Class */
},
{
  path: 'cart',
  component: CartComponent
},
{
  path: '', /* <-- empty string "default" url */
  redirectTo: 'home', /* <-- routes to above, home route */
  pathMatch: 'full'
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
