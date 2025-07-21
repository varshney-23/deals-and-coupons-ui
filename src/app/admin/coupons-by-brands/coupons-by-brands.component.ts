import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgIf, NgFor, TitleCasePipe, DatePipe, UpperCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service'; // Import your CartService
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-coupons-by-brands',
  templateUrl: './coupons-by-brands.component.html',
  styleUrl: './coupons-by-brands.component.css',
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
export class CouponsByBrandsComponent implements OnInit {
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

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }
}
