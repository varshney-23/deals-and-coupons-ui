import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-coupon',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './create-coupon.component.html',
  styleUrls: ['./create-coupon.component.css']
})
export class CreateCouponComponent {
  couponForm!: FormGroup;
  couponType: string = 'promotional'; // default

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.couponForm = this.fb.group({
      brandName: ['', Validators.required],
      brandLogo: ['', Validators.required],
      category: ['', Validators.required],
      offerDetails: ['', [Validators.required, Validators.maxLength(255)]],
      expiryTime: ['', Validators.required],
      quantity: [1], // optional for promo
      price: [0]     // optional for promo
    });
  }

  onTypeChange(type: string): void {
    this.couponType = type;
  }

  submit(): void {
    if (this.couponForm.invalid) return;

    const data = { ...this.couponForm.value };
    const url =
      this.couponType === 'paid'  
        ? 'http://localhost:8765/inventory/coupon/add/paid'
        : 'http://localhost:8765/inventory/coupon/add/promotional';

    if (this.couponType === 'promotional') {
      delete data.price;
      delete data.quantity;
    }

    const token = localStorage.getItem('authToken');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

      this.http.post(url, data, { responseType: 'text' }).subscribe({
        next: () => {
          this.snackBar.open('Coupon created successfully', 'Close', {
            duration: 3000
          });
          this.couponForm.reset();
        },
        error: err => {
          console.log('Error response:', err);
          this.snackBar.open(err.error?.message || 'Something went wrong', 'Close');
        }
      });
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }

}
