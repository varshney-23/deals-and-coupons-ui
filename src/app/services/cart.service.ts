import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems: any[] = [];

  getCart() {
    return this.cartItems;
  }

  addToCart(item: any) {
    const index = this.cartItems.findIndex(c => c.couponId === item.couponId);
    if (index > -1) {
      this.cartItems[index].quantity += item.quantity;
    } else {
      this.cartItems.push({ ...item });
    }
    console.log('Added to cart:', this.cartItems);
  }

  updateQuantity(couponId: number, quantity: number) {
    const item = this.cartItems.find(i => i.couponId === couponId);
    if (item) item.quantity = quantity;
  }

  removeFromCart(couponId: number) {
    this.cartItems = this.cartItems.filter(c => c.couponId !== couponId);
  }

  clearCart() {
    this.cartItems = [];
  }
}
