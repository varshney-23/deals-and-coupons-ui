// import { Component } from '@angular/core';
// import { NgFor } from '@angular/common';
// import { MatButtonModule } from '@angular/material/button';

// @Component({
//   selector: 'app-deals',
//   standalone: true,
//   imports: [NgFor, MatButtonModule],
//   templateUrl: './deals.component.html',
//   styleUrl: './deals.component.css'
// })
// export class DealsComponent {
//   brands = [
//     { name: 'Amazon', logo: 'assets/amazonLogo.jpg' },
//     { name: 'Flipkart', logo: 'assets/flipkartLogo.png' },
//     { name: 'Myntra', logo: 'assets/myntraLogo.png' },
//     { name: 'Ajio', logo: 'assets/ajioLogo.jpeg' },
//     { name: 'Swiggy', logo: 'assets/swiggyLogo.png' }
//   ];
// }

import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HttpClient } from '@angular/common/http';

interface Brand {
  brand_id: number;
  brandName: string;
  brandLogo: string;
}

@Component({
  selector: 'app-deals',
  standalone: true,
  imports: [NgFor, MatButtonModule],
  templateUrl: './deals.component.html',
  styleUrl: './deals.component.css'
})
export class DealsComponent implements OnInit {
  brands: Brand[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Brand[]>('http://localhost:8081/inventory/brands').subscribe(data => {
      this.brands = data;
    });
  }
}
