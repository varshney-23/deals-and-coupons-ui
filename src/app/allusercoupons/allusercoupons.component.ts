import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgIf, NgFor, TitleCasePipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-allusercoupons',
  standalone: true,
  templateUrl: './allusercoupons.component.html',
  styleUrls: ['./allusercoupons.component.css'],
  imports: [
    NgIf,
    NgFor,
    TitleCasePipe,
    DatePipe,
    RouterModule // ✅ THIS LINE IS MANDATORY for ActivatedRoute to work
  ]
})
export class AllusercouponsComponent implements OnInit {
  brandName = '';
  coupons: any[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const brand = params.get('brandName');
      if (brand) {
        this.brandName = brand;
        this.http.get<any[]>(`http://localhost:8081/inventory/coupon/get/brand/${brand}`)
          .subscribe({
            next: data => this.coupons = data,
            error: () => alert('Error fetching coupons.')
          });
      }
    });
  }
}
