import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Brand {
  brand_id: number;
  brandName: string;
  brandLogo: string;
}

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [NgFor, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.css'
})
export class DealsComponent implements OnInit {
  brands: Brand[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get<Brand[]>('http://localhost:8765/inventory/brands').subscribe(data => {
      this.brands = data;
    });
  }

  viewDeals(brand: Brand) {
    this.router.navigate(['/coupons-by-brands', brand.brandName]);
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
