export interface Cart {
  items: CartItem[];
}

export interface CartItem {
  product: string;
  name: string;
  price: number;
  quantity: number;
  id: number;
}