import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CouponResponseDTO } from '../../models/couponresponsedto.model';
import { Router } from '@angular/router';
import { CouponService } from '../../services/coupon.service';

@Component({
  selector: 'app-all-coupons',
  imports: [CommonModule],
  templateUrl: './all-coupons.component.html',
  styleUrl: './all-coupons.component.css'
})
export class AllCouponsComponent {

  coupons: CouponResponseDTO[] = [];

   constructor(
    private router: Router,
    private couponService: CouponService // Assuming you have a CouponService to handle coupon operations

   ) {}

    ngOnInit() {
      this.couponService.getAllCoupons().subscribe({
        next: (data) => {
          this.coupons = data;
          console.log('Coupons fetched:', this.coupons);
        },
        error: (err) => {
          console.error('Error fetching coupons:', err);
        }
      });
  }
}
