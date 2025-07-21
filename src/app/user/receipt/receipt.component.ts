import { CommonModule } from '@angular/common'; // ✅ Import this
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';


@Component({
  selector: 'app-receipt',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule], // ✅ Add CommonModule here
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {
  bookings: any[] = [];

  constructor(
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookingService.getAllBookings().subscribe(([paid, promo]) => {
      // add `type` field to help template know the type
      const mappedPaid = paid.map((b: any) => ({ ...b, type: 'PAID' }));
      const mappedPromo = promo.map((b: any) => ({ ...b, type: 'PROMO' }));
      this.bookings = [...mappedPaid, ...mappedPromo];
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
}
