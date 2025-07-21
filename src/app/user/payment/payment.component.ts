import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

declare var Razorpay: any;

@Component({
  selector: 'app-payment',
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  groupId: string = '';
  amount: number = 0;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.groupId = params['groupId'];
      const storedAmount = sessionStorage.getItem('groupPaymentAmount');

      if (!this.groupId || !storedAmount) {
        alert('Missing payment data. Please try again.');
        this.router.navigate(['/cart']);
        return;
      }

      this.amount = parseFloat(storedAmount);
      this.payNow();
    });
  }

  payNow() {
    const rawToken = localStorage.getItem('authToken');
    const token = rawToken ? `Bearer ${JSON.parse(rawToken).token}` : '';
    if (!token) {
      alert('You must be logged in to make a payment.');
      this.router.navigate(['/']);
      return;
    }
    const options = {
      key: 'rzp_test_ml3aJh6R7DYqMt',
      amount: this.amount * 100,
      currency: 'INR',
      name: 'Coupon Cart',
      description: 'Coupon Purchase',
      handler: (response: any) => {
        fetch(`http://localhost:8765/inventory/booking/payment/group/${this.groupId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({
            razorpayPaymentId: response.razorpay_payment_id
          })
        })
          .then(async res => {
            if (!res.ok) {
              const text = await res.text();
              throw new Error(`Error ${res.status}: ${text}`);
            }
            return res.text();
          })
          .then(() => {
            this.router.navigate(['/receipt']);
          })
          .catch(err => {
            console.error('Payment confirmation error:', err.message);
            alert('Payment was successful but confirmation failed. Please contact support.');
          });
      },
      prefill: {
        name: this.authService.getUserName(),
        email: this.authService.getUserEmail()
      }
    };

    this.isLoading = false;
    const rzp = new Razorpay(options);
    rzp.open();
  }
}
