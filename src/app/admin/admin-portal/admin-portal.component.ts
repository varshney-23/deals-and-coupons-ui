import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { CouponService } from '../../services/coupon.service';
import { CouponResponseDTO } from '../../models/couponresponsedto.model'; // Assuming you have a DTO for coupon response
import { BrandDialogComponent } from '../branddialog/branddialog.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';  

@Component({
  selector: 'app-admin-portal',
  imports: [CommonModule, MatButtonModule,MatIconModule],
  templateUrl: './admin-portal.component.html',
  styleUrls: ['./admin-portal.component.css']
})
export class AdminPortalComponent {

  coupons: CouponResponseDTO[] = [];

   constructor(
    private router: Router,
    private couponService: CouponService, // Assuming you have a CouponService to handle coupon operations
    private http: HttpClient,
    private dialog: MatDialog // For opening dialogs

   ) {}

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

    getAllCoupons() {
      this.router.navigate(['/coupons/all']);
    }

    getCouponsByBrand() {
      this.http.get<string[]>('http://localhost:8765/inventory/brands').subscribe(
        (brands) => {
          this.dialog.open(BrandDialogComponent, {
            data: brands,
            width: '400px',
            height: '500px',  
          });
        }
      );
    }

    getCouponsByCategory() {
      // To be implemented
    }

    createCoupon() {
      // To be implemented
      this.router.navigate(['/admin/create-coupon']);
    }

    updateCoupon() {
      // To be implemented
    }

    deleteCoupon() {
      // To be implemented
    }

    deleteExpiredCoupons() {
      // To be implemented
      this.http.delete('http://localhost:8765/inventory/coupon/delete-expired').subscribe({
        next: () => {
          this.coupons = [];
          this.getAllCoupons(); // Refresh the coupon list
        },
        error: err => {
          console.error('Error deleting expired coupons:', err);
        }
      });
    }

    // === Booking Actions ===
    getAllBookedCoupons() {
      // To be implemented
    }

}
