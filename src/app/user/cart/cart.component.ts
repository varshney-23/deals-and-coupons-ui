import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CommonModule, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth/auth.service'; // Ensure AuthService is imported

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [NgFor, MatIconModule, CommonModule],  // 🟢 This is mandatory!
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  isLoading: boolean = false; // 🟢 Show loading spinner
  
  constructor(
    private cartService: CartService,
    private router: Router,
    private authService: AuthService  // Ensure AuthService is imported
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService.getCart();
  }

  increment(item: any) {
    item.quantity++;
    this.cartService.updateQuantity(item.couponId, item.quantity);
  }

  decrement(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.cartService.updateQuantity(item.couponId, item.quantity);
    } else {
      this.cartService.removeFromCart(item.couponId);
      this.cartItems = this.cartService.getCart(); // refresh view
    }
  }

  goToPurchaseHistory() {
    this.router.navigate(['/previous-purchases']);
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }
  
  checkoutAll() {
    console.log("started!!");
    
    const raw = localStorage.getItem('authToken');
    const token = raw ? JSON.parse(raw).token : null;
    console.log("Token:", token);

    const userInfo = this.authService.getUserInfo();
    console.log("User Info:", userInfo);

    const payload = {
      userId: userInfo.id,
      coupons: this.cartItems.map(item => ({
        couponId: item.couponId,
        quantity: item.quantity
      }))
    };

    fetch('http://localhost:8765/inventory/booking/multiple/paid', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
      },
      body: JSON.stringify(payload)
    })
    .then(res => res.json())  // 👈 assuming backend returns JSON now
    .then((data: any) => {
      const groupId = data.groupId;
      const amount = data.totalAmount;

      if (groupId && amount) {
        sessionStorage.setItem('groupPaymentAmount', amount.toString());
        this.router.navigate(['/payment'], {
          queryParams: { groupId }  // ✅ ONLY groupId in URL
        });
      } else {
        console.error("Missing groupId or amount:", data);
      }
    })
    .catch(err => {
      console.error("Checkout error:", err);
    });
  }
}
