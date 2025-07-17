import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor, TitleCasePipe, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-portal',
  standalone: true,
  templateUrl: './user-portal.component.html',
  styleUrls: ['./user-portal.component.css'],
  imports: [
    NgFor, MatButtonModule, MatIconModule, RouterModule,
    NgIf,
    NgFor,
    TitleCasePipe,
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
    private router: Router
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const brand = params.get('brandName');
      if (brand) {
        this.brandName = brand;
        this.http.get<any[]>(`http://localhost:8765/inventory/coupon/get/brand/${brand}`)
          .subscribe({
            next: data => this.coupons = data
          });
      }
    });
  }

  goToMyCart() {
    this.router.navigate(['/cart']);
  }

  goToPurchaseHistory() {
    this.router.navigate(['/user-portal']);
  }

  logout() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/']);
  }
}
