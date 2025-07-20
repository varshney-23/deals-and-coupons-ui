import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgIf, NgFor, TitleCasePipe, DatePipe, UpperCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service'; // Import your CartService
import { FormsModule } from '@angular/forms';
import { CouponDialogComponent } from '../coupon-dialog/coupon-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-portal',
  standalone: true,
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.css'],
  imports: [
    NgFor, MatButtonModule, MatIconModule, RouterModule, FormsModule,
    NgIf,
    NgFor,
    TitleCasePipe,
    UpperCasePipe,
    DatePipe,
    RouterModule // ✅ THIS LINE IS MANDATORY for ActivatedRoute to work
  ]
})
export class UserPortalComponent implements OnInit {
  brandName = '';
  coupons: any[] = [];

  constructor(
    private route: ActivatedRoute, 
    private http: HttpClient,
    private router: Router,
    private cartService: CartService, // Assuming you have a CartService for managing cart items
    private dialog: MatDialog,
    private snackBar: MatSnackBar // For showing snack bar messages
  ) {}

  ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const brand = params.get('brandName');
    if (brand) {
      this.brandName = brand;
      this.http.get<any[]>(`http://localhost:8765/inventory/coupon/get/brand/${brand}`)
        .subscribe({
          next: data => {
            // 👇 ADD THIS LOOP TO SET INITIAL quantityToAdd
            this.coupons = data.map(c => ({
              ...c,
              quantityToAdd: 1 // default quantity for UI interaction
            }));
          }
        });
    }
  });
}



  goToMyCart() {
    this.router.navigate(['/cart']);
  }

  goToPurchaseHistory() {
    this.router.navigate(['/previous-purchases']);
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

  bookPromotional(couponId: number) {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', token);

  this.http.post<any>(`http://localhost:8765/inventory/booking/promotional/${couponId}`, {}, { headers })
    .subscribe({
      next: (res) => {
        this.dialog.open(CouponDialogComponent, {
          data: { couponCode: res.couponCode, error: null },
          width: '400px'
        });
      },
      error: (err) => {
        const errorMsg = err.error.message || 'Something went wrong!';
        this.dialog.open(CouponDialogComponent, {
          data: { couponCode: null, error: errorMsg },
          width: '400px'
        });
      }
    });
}


//   bookPaid(couponId: number, quantity: number) {
//   const token = localStorage.getItem('token');
//   const userId = localStorage.getItem('userId');  // 👈 get userId from local storage

//   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//   const request = { couponId, userId, quantity };

//   this.http.post(`http://localhost:8765/inventory/booking/paid`, request, { headers })
//     .subscribe({
//       next: res => alert("✅ Paid coupon booked!"),
//       error: err => alert("❌ " + err.error.message)
//     });
// }

  increaseQty(coupon: any) {
  coupon.quantityToAdd = (coupon.quantityToAdd || 1) + 1;
}

decreaseQty(coupon: any) {
  if ((coupon.quantityToAdd || 1) > 1) {
    coupon.quantityToAdd--;
  }
}

  addToCart(coupon: any) {
    const item = {
      couponId: coupon.couponId,
      brandName: coupon.brandName,
      price: coupon.price,
      quantity: coupon.quantityToAdd || 1, // ensure it's set!
      brandLogo: coupon.brandLogo,
      offerDetails: coupon.offerDetails
    };
    this.cartService.addToCart(item);
    console.log("Item added to cart!", item);
    this.snackBar.open('Item added to cart!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }


}   
